const mongoose = require("mongoose");
const passport = require("passport");

const validateStudentInput = require("../validation/student");
const Student = require("../models/Student");

module.exports.getStudent = async (req, res) => {
  let profile = await Student.findOne({ user: req.user.id });
  if (!profile) return res.status(404).json({ error: "Нет профиля" });
  res.send(profile);
};

module.exports.addStudent = async (req, res) => {
  const { errors, isValid } = validateStudentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let profile = await Student.findOne({ user: req.user.id });

  const profileFileds = {};
  profileFileds.user = req.user.id;
  if (req.body.lastname) profileFileds.lastname = req.body.lastname;
  if (req.body.firstname) profileFileds.firstname = req.body.firstname;
  if (req.body.fathername) profileFileds.fathername = req.body.fathername;
  if (req.body.bornDate) profileFileds.bornDate = req.body.bornDate;
  if (req.body.school_name) profileFileds.school_name = req.body.school_name;
  if (req.body.school_number)
    profileFileds.school_number = req.body.school_number;

  profileFileds.location = {};
  if (req.body.address) profileFileds.location.address = req.body.address;
  if (req.body.region) profileFileds.location.region = req.body.region;
  if (req.body.index) profileFileds.location.index = req.body.index;

  if (!profile) {
    profile = new Student(profileFileds);
    profile = await profile.save();
    return res.send(profile);
  }

  profile = await Student.findOneAndUpdate(
    { user: req.user.id },
    profileFileds,
    { new: true }
  );
  res.send(profile);
};
