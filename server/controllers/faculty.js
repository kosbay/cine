const mongoose = require("mongoose");

const Faculty = mongoose.model("Faculty");
const User = mongoose.model("User");

const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");

module.exports.getFaculties = async (req, res) => {
  try {
    let query = Faculty.find({});
    const { populateCourses } = req.query;

    if (populateCourses === "1") {
      query = query.populate({
        path: "courses"
      });
    }
    const faculties = await query.exec();
    res.status(200).send(faculties);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getFacultiesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.query;
    if (schoolId === "false") {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const users = await User.find({ school: schoolId })
        .lean()
        .exec();
      const facultiesIds = users
        .reduce(
          (acc, user) =>
            acc.faculties
              ? [...acc.faculties, ...user.faculties]
              : [...acc, ...user.faculties],
          []
        )
        .filter((value, index, self) => self.indexOf(value) === index);

      const faculties = await Faculty.find({ _id: { $in: facultiesIds } })
        .populate({ path: "courses", select: { name: 1, _id: 1 } })
        .lean()
        .exec();

      res.status(200).send(faculties);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.addFaculty = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const faculty = new Faculty(req.body);
      await faculty.save();
      res.status(200).send(faculty);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getFaculty = async (req, res) => {
  try {
    const { populateCourses } = req.query;

    if (populateCourses === "1") {
      const faculty = await Faculty.findById(req.params.facultyId).populate({
        path: "courses",
        populate: {
          path: "chapters",
          populate: {
            path: "modules",
            populate: { path: "lessons" }
          }
        }
      });
      res.status(200).send(faculty);
      return;
    }
    const faculty = await Faculty.findById(req.params.facultyId);
    res.status(200).send(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateFaculty = async (req, res) => {
  try {
    await Faculty.update({ _id: req.params.facultyId }, req.body);
    const faculty = await Faculty.findById(req.params.facultyId);
    res.status(200).send(faculty);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    if (!facultyId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(Faculty.findByIdAndRemove(facultyId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}
