import _ from 'lodash';

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
// const UserCoursePoints = mongoose.model("UserCoursePoints");
const UserSkills = mongoose.model("UserSkills");
const refreshWupaiAmountForUsers = require("../refreshers/wupaiUsers");
const { BadgeUp, modifierType } = require("services/BadgeUp");
const { validate } = require("../validations/progress");
const { validationResult } = require("express-validator/check");

const {
  requireAdmin,
  requireUser,
  requireReviewer,
  requireTeacher
} = require("../helpers/group");
const { UserNotification, NotificationMessages } = require('../services/Firebase');
const addPointsByLesson = require("../helpers/addPoints");
const contentRefresher = require("../refreshers/wupaiContent");
const schoolWupaisRefresher = require("../refreshers/wupaiSchool");
const refreshUserWupaiById = require("../refreshers/wupaiUserById");
const refreshBadge = require("../refreshers/badgeUsers");

const getLessonWithProgress = async (lessonId, userId, isNested) => {
  const [lesson, userProgress, userLessonPoints] = await Promise.all([
    isNested ? Lesson.findById(lessonId).select({
      name: 1, _id: 1, wupai: 1, type: 1, isFree: 1
    }).lean() : Lesson.findById(lessonId).lean(),
    UserProgress.findOne({
      userId,
      lessonId
    }).lean(),
    UserLessonPoints.findOne({
      userId,
      lessonId
    }).lean()
  ]);
  if (!lesson) return null;
  let result = Object.assign({}, {
    full: false,
    ...lesson,
    finished: false,
    moduleId: module._id,
    userWupai: 0
  }, !lesson.wupai && { wupai: 1 });

  if (userProgress) {
    result = {
      ...result,
      fileName: userProgress.fileName,
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

const getModuleWithProgress = async (moduleId, userId, isNested) => {
  const module = await Module.findById(moduleId).select({
    wupai: 1, name: 1, lessons: 1, _id: 1, isFree: 1
  }).lean();
  const lessonsWithProgressPromise = Promise.all(
    module.lessons.map(lessonId => getLessonWithProgress(lessonId, userId, isNested))
  );

  const userModulePointsPromise = UserModulePoints.findOne({
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
    userLessons: lessonsWithProgress.filter(f => f),
    finished,
    userWupai
  };
};

const getChaptersWithProgresses = async ({
  chapterIds, userId, isNotNested
}) => {
  const [chapters, userChaptersPoints] = await Promise.all([
    isNotNested
      ? Chapter.find({ _id: { $in: chapterIds }}).select({
        modules: 1, name: 1, wupai: 1, _id: 1, active: true, description: 1, isFree: 1, imageURL: 1
      }).lean()
      : Chapter.find({ _id: { $in: chapterIds }}).lean(),
    UserChapterPoints.find({ chapterId: { $in: chapterIds }, userId }).lean()
  ]);
  /* Fetch all modules if needed */
  let modulesObj = {};
  if (!isNotNested) {
    const modulesWithProgressNested = await Promise.all(chapters.map(async chapter =>
      Promise.all(chapter.modules.map(
          moduleId => getModuleWithProgress(moduleId, userId, !isNotNested)
        ))
    ));
    const modulesWithProgress = modulesWithProgressNested.reduce((acc, m) =>
      [ ...acc, ...m], []
    );

    modulesObj = modulesWithProgress.reduce((acc, module) => ({ ...acc, [module._id]: module }), {});
  }

  /* Fetch all course points if needed */
  const userChaptersPointsObj = userChaptersPoints.reduce((acc, userChapterPoints) => ({
    ...acc,
    [userChapterPoints.chapterId]: userChapterPoints
  }), {});
  const chaptersWithProgresses = chapters.map(chapter => {
    const chapterWupai = userChaptersPointsObj[chapter._id]
      ? userChaptersPointsObj[chapter._id].wupai : 0;

    const finishedModules = chapter.modules.filter(moduleId =>
      modulesObj[moduleId] && modulesObj[moduleId].finished
    );

    const userModules = chapter.modules.map(moduleId => modulesObj[moduleId]);

    const finished = Boolean(userChaptersPointsObj[chapter._id]
      && chapter.wupai <= userChaptersPointsObj[chapter._id].wupai);

    return Object.assign({
        ...chapter,
        numberOfModules: chapter && chapter.modules ? chapter.modules.length : 0,
        userWupai: chapterWupai,
        finished
      },
      !isNotNested && { userModules },
      !isNotNested && finishedModules && { finishedModules }
    );
  });

  return chaptersWithProgresses;
};

const getCoursesWithProgress = async ({
  courseIds, userId, isNotNested
}) => {
  const [courses] = await Promise.all([
    Course.find({ _id: { $in: courseIds }}).populate('certificate').lean()
  ]);
  /* Fetch all chapter if needed */
  let chaptersObj = {};
  if (!isNotNested) {
    const chapterIds = courses.reduce((acc, course) => [...acc, ...course.chapters], []);
    const chapters = await getChaptersWithProgresses({ chapterIds, userId, isNotNested: true });
    chaptersObj = chapters.reduce((acc, chapter) => ({ ...acc, [chapter._id]: chapter }), {});
  }

  /* Fetch all course points if needed */
  const coursesWithProgresses = courses.map(course => {
    const finishedChapters = course.chapters.filter(chapterId =>
      chaptersObj[chapterId] && chaptersObj[chapterId].finished
    ).length;
    const chaptersWithProgress = course.chapters.map(chapterId => chaptersObj[chapterId]);
    return Object.assign({
        ...course,
        numberOfChapters: course && course.chapters ? course.chapters.length : 0
      },
      chaptersWithProgress && { chaptersWithProgress },
      typeof finishedChapters === "number" && { finishedChapters }
    );
  });

  return coursesWithProgresses;
};

const getCourseWithProgress = async ({courseId, userId, isNotNested, select}) => {
  const [course] = await Promise.all([
    select
      ? Course.findById(courseId).populate('certificate').select(select).lean()
      : Course.findById(courseId).populate('certificate').lean()
  ]);

  const chaptersWithProgress =
    !isNotNested &&
    course &&
    getChaptersWithProgresses({chapterIds: course.chapters, userId, isNotNested: true })

  const finishedChapters =
    chaptersWithProgress &&
    chaptersWithProgress.filter(({ finished: isFinished }) => isFinished)
      .length;

  return Object.assign(
    {
      ...course,
      numberOfChapters: course && course.chapters ? course.chapters.length : 0,
    },
    chaptersWithProgress && { chaptersWithProgress },
    finishedChapters && { finishedChapters }
  );
};

module.exports = (app) => {
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

  app.post("/api/progress/finishLesson", validate(), requireUser, async (req, res) => {
    console.time("finishLesson API");
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      return res.status(400).send(errors);
    }
    const { userId, lessonId, result, fileURL, fileName } = req.body;

    const status = req.body.status || "finished";

    const values = { userId, lessonId, status };
    if (result) values.result = result;
    if (fileURL) values.fileURL = fileURL;
    if (fileName) values.fileName = fileName;

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
        ){
          // begin the process of adding points
          const isPointsAdded = await addPointsByLesson(userProgress);
          if(!isPointsAdded){
            return res.status(400).send("Error on addPointsByLesson, problem with lessonId or userId!")
          }
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
            const notificationMessage = await NotificationMessages.findByTitle(module.name);
            if(notificationMessage && notificationMessage.length > 0){
              await UserNotification.createAndGet({
                recieverId: userId,
                notificationMessageId: notificationMessage[0]._id,
                isRead: false,
                isSend: false,
                recieverId_isSend: `${userId}_false`
              })
            } else{
              const newNotificationMessage = await NotificationMessages.createAndGet({
                title: module.name,
                description: `Вы успешно завершили модуль ${module.name}!`,
                date: new Date(),
                type: "module"
              });
              await UserNotification.createAndGet({
                recieverId: userId,
                notificationMessageId: newNotificationMessage[0]._id,
                isRead: false,
                isSend: false,
                recieverId_isSend: `${userId}_false`
              });
            }
          }
        }
      }
    console.timeEnd("finishLesson API");
    return res.status(200).send({ message });
    } catch (err) {
      return res.status(422).send(err);
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
      console.time("getCoursesWithProgress");
      const { user } = req;
      const courseFilter = user.role === 'demo'
          ? { isFree: true } : {};
      try {
        const faculties = await Faculty.find({ _id: { $in: user.faculties } }).lean();
        let courseIds = user.courses.slice(0) || [];

        // removing courses which are part of some faculty
        for (let i = 0; i < faculties.length; i += 1) {
          courseIds = courseIds.filter(
            courseId => faculties[i].courses.indexOf(courseId) < 0
          );
          courseIds = [...courseIds, ...faculties[i].courses];
        }
        const courses = await Course.find({ ...courseFilter, _id: { $in: courseIds } }).lean();
        await Course.findById(courses[0]._id);
        // find progress for each one
        const coursesWithProgress = courses.map(async course =>
          getCourseWithProgress({courseId: course._id, userId: user._id, isNotNested: true })
        );

        const results = await Promise.all(coursesWithProgress);
        console.timeEnd("getCoursesWithProgress");
        res.status(200).send(results);
      } catch (err) {
        console.log('err: ', err);
        res.status(422).send(err);
      }
    }
  );

  app.get("/api/progress/getUserLesson", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { lessonId } = req.query;
    const { _id: userId } = req.user;
    try {
      console.time("getUserLesson");
      const [ lesson, userLesson ] = await Promise.all([
        Lesson.findById(lessonId).lean(),
        getLessonWithProgress(lessonId, userId)
      ]);
      if (!lesson.isFree && req.user.role === 'demo') {
        return res.send({ type: "No Access", name: lesson.name, title: "No access" });
      }
      const resultLesson = Object.assign({},
        userLesson,
        lesson,
        !lesson.wupai && { wupai: 1 },
        { full: true }
      );
      console.timeEnd("getUserLesson");
      res.status(200).send(resultLesson);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/progress/getModuleWithProgress", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { userId, moduleId } = req.query;
    try {
      const results = await getModuleWithProgress(moduleId, userId);

      res.status(200).send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/progress/getCourseWithProgress", requireUser, async (req, res) => {
    // return user courses which are not part of faculties
    const { userId, courseId } = req.query;
    try {
      console.time("getCourseWithProgress");
      const results = await getCoursesWithProgress({courseIds: [courseId], userId });
      console.timeEnd("getCourseWithProgress");
      res.status(200).send(results ? results[0] : results);
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
        console.time("getChapterWithProgress");
        const results = await getChaptersWithProgresses({chapterIds: [chapterId], userId, isNotNested: false });
        console.timeEnd("getChapterWithProgress");
        res.status(200).send(results ? results[0] : results);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.get("/api/submissions", requireReviewer, async (req, res) => {
    try {
      const { username, status, lessonName, limit, page } = req.query;
      const pageSizeLimit = limit ? Number(limit) : 10;
      const perPage = limit ? Number(limit) : 10;
      const currentPage = page ? Number(page) : 1;
      const resultSubmissions = {
        docs: [],
        total: 0,
        limit: pageSizeLimit,
        page: currentPage,
        skip: perPage * (currentPage - 1),
        pages: 0
      };
      const searchOptions = Object.assign(
        {},
        { fileURL: { $ne: null } },
        status && { status }
      );
      const userNameRegExp = new RegExp(`^${username}`, "i");  
      const lessonNameRegExp = new RegExp(`^${lessonName}`, "i");    
      let findedUserProgressList = await UserProgress.find(searchOptions); // Is not read-only!!!

      if(findedUserProgressList.length > 0){
        const userIds = findedUserProgressList.map(progress=>progress.userId)
        const lessonIds = findedUserProgressList.map(progress=>progress.lessonId)

        const userSearchOptions = Object.assign(
          {},
          {"_id": { "$in": userIds}},
          username && { username: { $regex: userNameRegExp } }
        )
        const lessonSearchOptions = Object.assign(
          {},
          {"_id": { "$in": lessonIds}},
          lessonName && { name: { $regex: lessonNameRegExp } }
        )
        const groupQuery = await Promise.all([
            User.aggregate([
              {
                "$match": userSearchOptions
              },
              { 
                "$project": {"username":1}
              }
            ]).exec(),
            Lesson.aggregate([
              {
                "$match": lessonSearchOptions
              },
              { 
                "$project": {"name":1}
              }
            ]).exec()
        ]);
        findedUserProgressList = findedUserProgressList 
              .map(userProgress => ({
                    ...userProgress.toObject(),
                    user:  _.find( groupQuery[0], { '_id': userProgress.userId }),
                    lesson:  _.find( groupQuery[1], { '_id': userProgress.lessonId })
                  }))
              .filter(userProgress => {
                  if(!userProgress.user || !userProgress.lesson)
                    return false;
                  if(username && lessonName)
                    return userNameRegExp.test(userProgress.user.username) 
                    && lessonNameRegExp.test(userProgress.lesson.name)
                  else if(username && !lessonName)
                    return  userNameRegExp.test(userProgress.user.username) 
                  else if(!username && lessonName)
                    return lessonNameRegExp.test(userProgress.lesson.name)    
                  return true;  
              })

        resultSubmissions.docs = findedUserProgressList
                                      .slice(resultSubmissions.skip, resultSubmissions.skip + pageSizeLimit)
        resultSubmissions.total = findedUserProgressList.length;
        resultSubmissions.pages = Math.ceil(resultSubmissions.total/pageSizeLimit);
      }  

      findedUserProgressList = null;      
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
          const chapterWithProgressArr = await getChaptersWithProgresses({
            chapterId: mongoose.Types.ObjectId(chapterId),
            userId: mongoose.Types.ObjectId(user._id),
            isNotNested: true // not nested
          });

          return {
            user,
            progress: chapterWithProgressArr ? chapterWithProgressArr[0]:  {}
          };
        })
      );
      res.send(userChapterWithProgress);
    } catch (err) {
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
