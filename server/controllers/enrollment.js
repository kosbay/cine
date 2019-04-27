const mongoose = require("mongoose");

const User = mongoose.model("User");
const Course = mongoose.model("Course");
const Chapter = mongoose.model("Chapter");
const Faculty = mongoose.model("Faculty");

const isUserEnrolledToCourse = (courseId, user) => {
  const matchedCourses = user.courses.filter(course =>
    course._id.equals(courseId)
  );
  return matchedCourses.length > 0
};

const isUserEnrolledToFaculty = async (courseId, user) => {
  const faculties = await Faculty.find({ _id: { $in: user.faculties } });
  const isUserEnrolledToFacultyWithCourse = Boolean(faculties
      .map(({ courses: facultyCourses }) => facultyCourses)
      .reduce((acc, nextValue) => 
        [...acc, ...(nextValue || [])], []
      )
      .filter(userCourseId => `${userCourseId}`.localeCompare(`${courseId}`) === 0).length
    );

  return isUserEnrolledToFacultyWithCourse;
};

const isUserEnrolledToChapter = async (chapterId, user) => {
  const courses = await Course.find({chapters: { $in: [chapterId] }});
  const coursesIds = courses.map( ({_id}) => _id);
  const userFaculties = await Faculty.find({ _id: { $in: user.faculties } }); 
  const userFacultiesIds = userFaculties.map(
    ({courses: facultyCourses}) => facultyCourses
  ).reduce((acc, nextValue) => [...acc, ...nextValue], []);

  const isUserEnrolledToCourseWithChapter = Boolean(
    userFacultiesIds.filter(
        courseId => {
          const isEnrolled = coursesIds.includes(courseId);

          return isEnrolled;
        }
      )
  );
  return isUserEnrolledToCourseWithChapter;
};

const isUserEnrolledToModule = async (moduleId, user) => {
  const chapters = await Chapter.find({modules: { $in: [moduleId] }});
  const chaptersIds = chapters.map(({ _id }) => _id);
  const isUserEnrolledToChapterWithModule = Boolean(chaptersIds.map(chapterId => isUserEnrolledToChapter(chapterId, user)).filter(f => f).length);
  return isUserEnrolledToChapterWithModule;
};

module.exports.userEnrollment = async (req, res) => {
  try {
    await User.update(
      { _id: req.user._id },
      {
        $push: {
          courses: req.body.courseId
        }
      }
    ).exec();

    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.adminEnrollment = async (req, res) => {
  try {
    await User.update(
      { _id: req.body.userId },
      {
        courses: req.body.courses
      }
    ).exec();

    const user = await User.findById(req.body.userId);
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.getEnrollmentStatus = async (req, res) => {
  const { courseId, moduleId, chapterId } = req.query;
    if (!courseId && !moduleId && !chapterId) {
      res.status(400).send({
        error: {message: 'Provide either courseId, moduleId, chapterId'}
      });
      return;
    }
    const user = await User.findById(req.user._id);
    let isEnrolled = false;
    if (chapterId) {
      isEnrolled =  await isUserEnrolledToChapter(chapterId, user);
    }

    if (courseId) {
      isEnrolled = await isUserEnrolledToCourse(courseId, user);
    }

    if (moduleId) {
      isEnrolled = await isUserEnrolledToModule(moduleId, user);
    }

    if (!isEnrolled) {
      // check if user is enrolled through faculty
      isEnrolled = await isUserEnrolledToFaculty(courseId, user);
    }

    res.send({ _id: moduleId || chapterId || courseId, isEnrolled });
}

module.exports.userFacultyEnrollment = async (req, res) => {
  try {
    await User.update(
      { _id: req.user._id },
      {
        $push: {
          faculties: req.body.facultyId
        }
      }
    ).exec();

    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.adminFacultyEnrollment = async (req, res) => {
  try {
    await User.update(
      { _id: req.body.userId },
      {
        faculties: req.body.faculties
      }
    ).exec();

    const user = await User.findById(req.body.userId);
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
}

