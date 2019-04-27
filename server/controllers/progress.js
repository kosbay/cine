const mongoose = require("mongoose");

const Course = mongoose.model("Course");
const Chapter = mongoose.model("Chapter");
const Module = mongoose.model("Module");
const Lesson = mongoose.model("Lesson");
const User = mongoose.model("User");
const UserProgress = mongoose.model("UserProgress");
const Faculty = mongoose.model("Faculty");
const UserLessonPoints = mongoose.model("UserLessonPoints");
const UserModulePoints = mongoose.model("UserModulePoints");
const UserChapterPoints = mongoose.model("UserChapterPoints");
const UserCoursePoints = mongoose.model("UserCoursePoints");
const UserSkills = mongoose.model("UserSkills");
const NotificationMessage = mongoose.model("NotificationMessage");
const Notification = mongoose.model("Notification");
const refreshWupaiAmountForUsers = require("../refreshers/wupaiUsers");
const { BadgeUp, modifierType } = require("services/BadgeUp");

const {
  requireAdmin,
  requireUser,
  requireReviewer,
  requireTeacher
} = require("../helpers/group");

const addPointsByLesson = require("../helpers/addPoints");
const contentRefresher = require("../refreshers/wupaiContent");
const schoolWupaisRefresher = require("../refreshers/wupaiSchool");
const refreshUserWupaiById = require("../refreshers/wupaiUserById");
const refreshBadge = require("../refreshers/badgeUsers");

const getLessonWithProgress = async (lesson, userId) => {
  const [userProgress, userLessonPoints] = await Promise.all([
    await UserProgress.findOne({
      userId,
      lessonId: lesson._id
    }).lean(),
    await UserLessonPoints.findOne({
      userId,
      lessonId: lesson._id
    }).lean()
  ]);

  let result = {
    full: false,
    ...lesson,
    finished: false,
    moduleId: module._id,
    userWupai: 0
  };

  if (userProgress) {
    result = {
      ...result,
      fileURL: userProgress.fileURL,
      status: userProgress.status,
      finished: userProgress.status === "finished",
      result: userProgress.result,
      feedback: userProgress.feedback
    };
  }

  // TODO: remove next lines
  if (result.finished) {
    result.userWupai = lesson.wupai || 1;
  }

  if (userLessonPoints) {
    // TODO: this line should work
    // result.userWupai = userLessonPoints.wupai;
  }

  return result;
};

const getModuleWithProgress = async (module, userId) => {
  const lessonsWithProgressPromise = await Promise.all(
    module.lessons.map(lesson => getLessonWithProgress(lesson, userId))
  );

  const userModulePointsPromise = await UserModulePoints.findOne({
    moduleId: module._id,
    userId
  }).lean();

  const [lessonsWithProgress, userModulePoints] = await Promise.all([
    lessonsWithProgressPromise,
    userModulePointsPromise
  ]);
  let finished = false;
  if (userModulePoints && module.wupai <= userModulePoints.wupai)
    finished = true;
  let userWupai = 0;
  if (userModulePoints) userWupai = userModulePoints.wupai;

  return {
    ...module,
    userLessons: lessonsWithProgress,
    finished,
    userWupai
  };
};

const getChapterWithProgress = async ({chapterId, userId, isNotNested, io}) => {
  const chapter = isNotNested
    ? await Chapter.findById(chapterId).lean()
    : await Chapter.findById(chapterId)
        .lean()
        .populate({
          path: "modules",
          select: "name _id wupai",
          populate: {
            path: "lessons",
            select: "name _id type wupai"
          }
        });
  // const chapter = await chapterQuery.exec();
  const modulesWithProgressPromise =
    !isNotNested &&
    (await Promise.all(
      // returning modules
      chapter.modules.map(async module => {
        const moduleWithProgress = await getModuleWithProgress(module, userId);
        return { ...moduleWithProgress, chapterId };
      })
    ));

  const userChapterPointsPromise = await UserChapterPoints.findOne({
    chapterId,
    userId
  });

  const [modulesWithProgress, userChapterPoints] = await Promise.all([
    modulesWithProgressPromise && modulesWithProgressPromise,
    userChapterPointsPromise
  ]);

  let finished = false;
  if (userChapterPoints && chapter.wupai <= userChapterPoints.wupai)
    {
      finished = true;
      let notification = null;
      const notificationMessage = await NotificationMessage.findOne({ title: chapter.name });

      if(notificationMessage && Object.keys(notificationMessage).length > 0){
        notification = await Notification.findOne({
          recieverId: userId,
          notificationMessageId: notificationMessage._id
        }).populate("notificationMessageId");
      }

      if(!notification){
        if(notificationMessage && Object.keys(notificationMessage).length > 0){
          notification = await Notification.create({
            recieverId: userId,
            notificationMessageId: notificationMessage._id,
            isRead: false,
            isSend: false,
            recieverId_isSend: `${userId}_false`
          })
        } else{
          const newNotificationMessage = await NotificationMessage.create({
            title: chapter.name,
            description: `Вы успешно завершили проект ${chapter.name}!`,
            date: new Date(),
            type: "chapter"
          });
          notification = await Notification.create({
            recieverId: userId,
            notificationMessageId: newNotificationMessage._id,
            isRead: false,
            isSend: false,
            recieverId_isSend: `${userId}_false`
          })
        }
      }

      let notificationToClient;
      if(Object.keys(notification).length > 0 && io){
        notificationToClient = await Notification.findOne({ _id: notification._id, isSend: false }).populate("notificationMessageId");
      }

      if(notificationToClient && Object.keys(notificationToClient).length > 0 && io){

        io.emit(userId, notificationToClient);
      }
    }
  let userWupai = 0;
  if (userChapterPoints) userWupai = userChapterPoints.wupai;

  return Object.assign(
    {},
    {
      ...chapter,
      finished,
      userWupai
    },
    modulesWithProgress && { userModules: modulesWithProgress }
  );
};

const getCourseWithProgress = async ({courseId, userId, isNotNested, select, io}) => {
  const [course, userCoursePoints] = await Promise.all([
    select
      ? await Course.findById(courseId)
          .populate('certificate')
          .select(select)
          .lean()
      : await Course.findById(courseId).populate('certificate').lean(),
    await UserCoursePoints.findOne({ courseId, userId }).lean()
  ]);
  let finished = false;
  if (userCoursePoints && course.wupai === userCoursePoints.wupai)
    finished = true;

  let courseWupai = 0;
  if (userCoursePoints) courseWupai = userCoursePoints.wupai;

  const chaptersWithProgress =
    !isNotNested &&
    course &&
    course.chapters &&
    (await Promise.all(
      course.chapters.map(chapterId =>
        getChapterWithProgress({chapterId, userId, io})
      )
    ));

  const finishedChapters =
    chaptersWithProgress &&
    chaptersWithProgress.filter(({ finished: isFinished }) => isFinished)
      .length;

  return Object.assign(
    {
      ...course,
      numberOfChapters: course && course.chapters ? course.chapters.length : 0,
      userWupai: courseWupai,
      finished
    },
    chaptersWithProgress && { chaptersWithProgress },
    finishedChapters && { finishedChapters }
  );
};

module.exports = (io, app) => {
  app.get("/api/test", requireAdmin, async (req, res) => {
    try {
      const test = await UserModulePoints.find({
        moduleId: "5b90d8a9e64c5053891d66bb",
        userId: "5b9f2865e86e830f3f0d995b"
      });
      res.status(200).send(test);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/progress/refreshBadge", requireAdmin, async (req, res) => {
    try {
      await refreshBadge();
      res.status(200).send("Badge of Users Created");
    } catch (err) {
      console.log("Error on Refresh Api", err);
      throw err;
    }
  });

  app.get("/api/progress/refreshUserWupaiById", requireAdmin, async (req, res) => {
    try {
      await refreshUserWupaiById([req.query.userId]);
      res.status(200).send("User's wupai updated!");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  app.get(
    "/api/progress/refreshWupaiAmountForUsers",
    requireAdmin,
    async (req, res) => {
      try {
        await refreshWupaiAmountForUsers();
        res.status(200).send("successfully updated user progresses");
      } catch (error) {
        console.log("there is an error", error);
        res.status(500).send(error);
      }
    }
  );

  app.get(
    "/api/progress/refreshWupaiAmountForContent",
    requireAdmin,
    async (req, res) => {
      try {
        if (req.query.id) {
          await contentRefresher([req.query.id]);
        } else {
          await contentRefresher();
        }

        res.status(200).send("successfully updated content wupai");
      } catch (error) {
        console.log("Updating Content Api error: ", error);
        throw error;
      }
    }
  );

  app.get("/api/progress/refreshUsersAndSchools", async (req, res) => {
    try {
      await schoolWupaisRefresher(req.query.schoolId);
      res.status(200).send("Successfully updated users and schools");
    } catch (error) {
      console.log("Updating Users and Schools Error: ", error);
      throw error;
    }
  });

  app.post("/api/progress/finishLesson", requireUser, async (req, res) => {
    console.time("finishLesson");
    const { userId, lessonId, result, fileURL } = req.body;

    const status = req.body.status || "finished";

    const values = { userId, lessonId, status };
    if (result) values.result = result;
    if (fileURL) values.fileURL = fileURL;

    try {
      const userProgress = await UserProgress.findOneAndUpdate(
        {
          userId,
          lessonId
        },
        values,
        {
          new: true,
          upsert: true,
          returnOriginal: false
        }
      );
      let message = null;

      if (status === "finished") {
        // BadgeUp event Creating
        await BadgeUp.createEvent(userId, "lessonfinished", {
          [modifierType.increment]: 1
        });
        const modulePromise = await Module.findOne({
          lessons: { $all: [lessonId] }
        }).exec();
        const moduleId = modulePromise._id;

        const lessonPromise = await Lesson.findById(lessonId);
        // Checking finished lesson has Skill
        if (lessonPromise.skill) {
          const userSkills = await UserSkills.find({
            userId,
            skillId: lessonPromise.skill
          });
          if (userSkills.length > 0) {
            await UserSkills.findOneAndUpdate(
              { userId, skillId: lessonPromise.skill },
              { $inc: { point: 1 } },
              {
                new: true,
                upsert: true,
                returnOriginal: false
              }
            );
          } else {
            await UserSkills.create({
              userId,
              skillId: lessonPromise.skill,
              point: 1
            });
          }
        }

        const userLessonPointsPromise = UserLessonPoints.findOne({
          userId,
          lessonId
        }).exec();

        const currentModule = await Module.findById(moduleId);

        const responses = await Promise.all([
          modulePromise,
          lessonPromise,
          userLessonPointsPromise
        ]);
        const module = responses[0];
        const lesson = responses[1];
        const userLessonPoints = responses[2];

        if (
          module &&
          (!userLessonPoints || userLessonPoints.wupai !== lesson.wupai)
        ) {
          // check if module is finished
          const userModulePoints = await UserModulePoints.findOne({
            moduleId: module._id,
            userId
          });
          let finished = false;
          if (
            userModulePoints &&
            currentModule &&
            userModulePoints.wupai === currentModule.wupai - 1
          )
            finished = true;
          if (finished) {
            message = `Вы успешно завершили модуль ${module.name}!`;
            const notificationMessage = await NotificationMessage.find({ title: module.name });
            let notification;
            if(notificationMessage && notificationMessage.length > 0){
              notification = await Notification.create({
                recieverId: userId,
                notificationMessageId: notificationMessage._id,
                isRead: false,
                isSend: false,
                recieverId_isSend: `${userId}_false`
              })
            } else{
              const newNotificationMessage = await NotificationMessage.create({
                title: module.name,
                description: `Вы успешно завершили модуль ${module.name}!`,
                date: new Date(),
                type: "module"
              });
              notification = await Notification.create({
                recieverId: userId,
                notificationMessageId: newNotificationMessage._id,
                isRead: false,
                isSend: false,
                recieverId_isSend: `${userId}_false`
              })
            }
            if(notification && Object.keys(notification).length > 0 && io){
              const notificationToClient = await Notification.findOne({ _id: notification._id, isSend: false }).populate("notificationMessageId");
              io.emit(userId, notificationToClient);
            }
          }

          // begin the process of adding points
          addPointsByLesson(userProgress);
        }
      }

      console.timeEnd("finishLesson");
      res.status(200).send({ message });
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.get(
    "/api/progress/getFacultiesWithProgress",
    requireUser,
    async (req, res) => {
      // return user courses in the following format
      const { userId } = req.query;

      try {
        const user = await User.findById(userId);
        const faculties = await Faculty.find({
          _id: { $in: user.faculties }
        }).lean();
        const facultiesWithProgress = faculties.map(async faculty => {
          const coursesWithProgress = await Promise.all(
            faculty.courses.map(async courseId =>
              getCourseWithProgress({courseId, userId})
            )
          );

          // calculating number of finished faculties
          let numberOfCourses = 0;
          let finishedCourses = 0;

          coursesWithProgress.forEach(course => {
            numberOfCourses += 1;
            finishedCourses += course.finished;
          });

          return {
            ...faculty,
            userCourses: coursesWithProgress,
            numberOfCourses,
            finishedCourses,
            finished: numberOfCourses === finishedCourses && numberOfCourses > 0
          };
        });
        const results = await Promise.all(facultiesWithProgress);
        res.status(200).send(results);
      } catch (err) {
        res.status(422).send(err);
        console.log(err);
      }
    }
  );

  app.get(
    "/api/progress/getCoursesWithProgress",
    requireUser,
    async (req, res) => {
      // return user courses which are not part of faculties
      const { userId } = req.query;
      try {
        const user = await User.findById(userId);
        const faculties = await Faculty.find({ _id: { $in: user.faculties } });
        let courseIds = user.courses.slice(0) || [];

        // removing courses which are part of some faculty
        for (let i = 0; i < faculties.length; i += 1) {
          courseIds = courseIds.filter(
            courseId => faculties[i].courses.indexOf(courseId) < 0
          );
          courseIds = [...courseIds, ...faculties[i].courses];
        }
        const courses = await Course.find({ _id: { $in: courseIds } });

        // find progress for each one
        const coursesWithProgress = courses.map(async course =>
          getCourseWithProgress({courseId: course._id, userId, io, isNotNested: true })
        );
        const results = await Promise.all(coursesWithProgress);
        res.status(200).send(results);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.get("/api/progress/getUserLesson", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { lessonId } = req.query;
    const { _id: userId } = req.user;
    try {
      let lesson = await Lesson.findById(lessonId).lean();
      if(!lesson.wupai)
        lesson = {...lesson, wupai: 1};
      const userLesson = await getLessonWithProgress(lesson, userId);

      res.status(200).send({ ...userLesson, full: true });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/progress/getModuleWithProgress", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { userId, moduleId } = req.query;
    try {
      const module = await Module.findById(moduleId)
        .lean()
        .populate({
          path: "lessons"
        });

      const results = await getModuleWithProgress(module, userId);

      res.status(200).send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/progress/getCourseWithProgress", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { userId, courseId } = req.query;
    try {
      const results = await getCourseWithProgress({courseId, userId, io});
      res.status(200).send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get(
    "/api/progress/getChapterWithProgress",
    requireUser,
    async (req, res) => {
      // return user courses which are not part of faculties
      const { userId, chapterId } = req.query;
      try {
        const results = await getChapterWithProgress({chapterId, userId, isNotNested: false });

        res.status(200).send(results);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.get("/api/submissions", async (req, res) => {
    try {
      const { username, status, lessonName } = req.query;
      let resultSubmissions;

      const searchOptions = Object.assign(
        {},
        { fileURL: { $ne: null } },
        status && { status }
      );
      const submissions = await UserProgress.find(searchOptions)
        .populate({
          path: 'userId',
          match: username && { username: { $regex: new RegExp(`^${username}`, "i") } }
        })
        .populate({
          path: "lessonId",
          match: lessonName && { name: { $regex: new RegExp(`^${lessonName}`, "i") } },
        });

      Promise.all(
        resultSubmissions = submissions.filter(submission => submission.userId && submission.lessonId)
      )

      res.status(200).send(resultSubmissions);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get(
    "/api/submissions/:submissionId",
    requireReviewer,
    async (req, res) => {
      try {
        const submission = await UserProgress.findById(req.params.submissionId);
        res.send(submission);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.get("/api/courseProgressBySchool", requireTeacher, async (req, res) => {
    try {
      const { schoolId, courseId, limit, page: currentPage } = req.query;
      const facultyId = await Faculty.find({
        courses: { $in: mongoose.Types.ObjectId(courseId) }
      })
        .select({ _id: 1 })
        .lean();

      const searchOptions = {
        school: mongoose.Types.ObjectId(schoolId),
        role: { $eq: "user" },
        faculties: facultyId
      };
      const pageSizeLimit = Number(limit);
      const page = Number(currentPage);

      const queryOptions = Object.assign(
        {},
        {
          select: { name: 1, faculties: 1, _id: 1, courses: 1 },
          lean: true,
          sort: { name: 1 }
        },
        limit && { limit: pageSizeLimit || 10 },
        page && { page: page || 0 }
      );

      const users = await User.paginate(searchOptions, queryOptions);
      const userCoursesWithProgress = await Promise.all(
        users.docs.map(async user => {
          const courseWithProgress = await getCourseWithProgress({
            courseId: mongoose.Types.ObjectId(courseId),
            userId: mongoose.Types.ObjectId(user._id),
            isNotNested: true, // not nested
            select: { chapters: 1, name: 1, wupai: 1, _id: 1 }
          });
          return {
            user,
            progress: courseWithProgress
          };
        })
      );

      res.send({
        userCoursesWithProgress,
        limit: users.limit,
        page: users.page,
        pages: users.pages,
        total: users.total
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

  app.get("/api/chapterProgressBySchool", requireTeacher, async (req, res) => {
    try {
      const { schoolId, chapterId } = req.query;

      const users = await User.find({
        school: mongoose.Types.ObjectId(schoolId),
        role: { $eq: "user" }
      }).lean();

      const userChapterWithProgress = await Promise.all(
        users.map(async user => {
          const chapterWithProgress = await getChapterWithProgress({
            chapterId: mongoose.Types.ObjectId(chapterId),
            userId: mongoose.Types.ObjectId(user._id),
            isNotNested: true // not nested
          });
          return {
            user,
            progress: chapterWithProgress
          };
        })
      );
      res.send(userChapterWithProgress);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

  app.post(
    "/api/submissions/:submissionId",
    requireReviewer,
    async (req, res) => {
      try{
        const { submissionId } = req.params;
        await UserProgress.findOneAndUpdate(
          {
            _id: submissionId
          },
          req.body
        );
        const submission = await UserProgress.findById(submissionId);
        if (submission && submission.status === "finished") {
          await addPointsByLesson(submission);
        }
        res.status(200).send(submission);
      } catch(err) {
        console.log(err);
        res.status(500).send({ err });
      }

    }
  );

  app.delete(
    "/api/submissions/:submissionId",
    requireReviewer,
    async (req, res) => {
      try {
        const result = await UserProgress.findByIdAndRemove(
          req.params.submissionId
        );
        res.send(result);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
