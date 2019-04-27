const mongoose = require("mongoose");

const Course = mongoose.model("Course");
const User = mongoose.model("User");
const Faculty = mongoose.model("Faculty");

const contentRefresher = require("../refreshers/wupaiContent");
const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");


const fetchCourses = async ({ isAdmin, queryParams }) => {
  const filter = isAdmin
    ? {}
    : { $or: [{ draft: { $exists: false } }, { draft: false }] };

  let query = Course.find(filter);
  const { populate } = queryParams;

  if (populate === "1") {
    query = query.populate({
      path: "chapters",
      populate: {
        path: "modules",
        populate: { path: "lessons" }
      }
    });
  }
  const courses = await query.exec();
  return courses;
};

module.exports.getCourses = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const courses = await fetchCourses({ isAdmin, queryParams: req.query });
    res.status(200).send(courses);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

module.exports.addCourse = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const course = new Course(req.body);
      await course.save();
      res.status(200).send(course);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      let query = Course.findById(courseId);
      const {
        populateChapters,
        populateModules,
        populateLessons
      } = req.query;

      if (populateLessons === "1") {
        query = query.populate({
          path: "chapters",
          populate: {
            path: "modules",
            populate: {
              path: "lessons"
            }
          }
        });
      } else if (populateModules === "1") {
        query = query.populate({
          path: "chapters",
          populate: {
            path: "modules"
          }
        });
      } else if (populateChapters === "1") {
        query = query.populate("chapters");
      }
      const course = await query.exec();
      res.status(200).send(course);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Course.update({ _id: courseId }, req.body);
      const [err, course] = await to(Course.findById(req.params.courseId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(course);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(Course.findByIdAndRemove(courseId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      await contentRefresher();
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getUserCourse = async (req, res) => {
  try {
    const { user: { id: userId }} = req;
    const user = await User.findById(userId).select({ courses: 1, faculties: 1 }).lean();;
    const faculties = await Faculty.find({ _id: { $in: user.faculties }}).select({ courses: 1 }).lean();
    const facultiesCourses = faculties.reduce((acc, {courses}) => [...acc, ...courses], [])
    const courses = await Course.find({ _id: { $in: [...facultiesCourses, ...user.courses ]}}).lean();
    res.send(courses);
  } catch (err) {
    res.status(422).send(err);
  }
}
