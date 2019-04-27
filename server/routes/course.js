const express = require('express');

const router = express.Router();

const mongoose = require("mongoose");
const passportJWT = require("passport-jwt");

const Course = mongoose.model("Course");

const { requireAdmin, requireUser } = require("../helpers/group");
const { validate } = require("../validations/course");

const { ExtractJwt } = passportJWT;

const { getUserCourse, getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/course");

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

router.get('/courses', async (req, res, next) => {
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      if (
        token &&
        `${token}`.localeCompare("null") !== 0 &&
        `${token}`.localeCompare("undefined") !== 0
      ) {
        return next();
      }

      const courses = await fetchCourses({
        isAdmin: false,
        queryParams: req.query
      });
      return res.status(200).send(courses);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  },
  requireUser,
  getCourses
)
router.get('/userCourses', requireUser, getUserCourse);
router.get('/courses/:courseId', getCourse);
router.post('/courses', validate(), requireAdmin, addCourse);
router.post('/courses/:courseId', requireAdmin, updateCourse);
router.delete('/courses/:courseId', requireAdmin, deleteCourse)

module.exports = router;
