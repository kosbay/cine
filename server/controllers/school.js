const mongoose = require("mongoose");

const School = mongoose.model("School");
const User = mongoose.model("User");

const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");

module.exports.getSchools = async (req, res) => {
  try {
    const { sortByWupai, page, limit, schoolId } = req.query;
    const pageSizeLimit = Number(limit);
    const queryOptions = Object.assign(
      {},
      sortByWupai && { sort: { wupai: Number(sortByWupai) } },
      { limit: pageSizeLimit || 10 },
      page && { page: Number(page) - 1 < 0 ? 0 : Number(page) - 1 || 0 }
    );

    const searchOptions = Object.assign({}, schoolId && { _id: schoolId });
    let schools = await School
      .find(searchOptions)
      .sort(queryOptions.sort)
      .skip(Number(queryOptions.page) * Number(queryOptions.limit))
      .limit(Number(queryOptions.limit))
      .fill('studentsCount')
    const schoolCount = await School.count(searchOptions);
    const pages = Math.ceil(schoolCount / Number(queryOptions.limit)) || 1;
    if (typeof sortByWupai !== "undefined") {
      schools = schools.map(school => {
        const greaterDocmentCount = schools.filter(
          ({ wupai }) => wupai > school.wupai
        ).length;
        const queryPage = page < 1 ? 1 : Number(page) || 1;
        const offsetNumber = (queryPage || 1) - 1;
        const offset = offsetNumber * (Number(limit) || 10);
        const position = greaterDocmentCount + offset + 1;
        return { ...school.toObject(), position };
      });
    }

    res.status(200).send({
      docs: schools,
      total: schoolCount,
      limit: Number(queryOptions.limit),
      page: page < 1 ? 1 : Number(page) || 1,
      pages
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getSchoolList = async (req, res) => {
  try {
    const [err, schools] = await to(School.find({}).select("_id, name"));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(schools);
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getSchoolInfo = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const school = await School.findById(schoolId);
    if (!school) {
      res.status(400).send("School not found");
      return;
    }

    const { wupai } = school;
    const rankPosition = await School.distinct("wupai").count({
      wupai: { $gt: wupai }
    });

    const studentsCount = await User.count({
      school: schoolId,
      role: { $eq: "user" }
    }).exec();

    res.status(200).send({
      position: rankPosition + 1,
      _id: school._id,
      name: school.name,
      wupai,
      studentsCount
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addSchool = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const school = new School(req.body);
      await school.save();
      res.status(200).send(school);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getSchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, school] = await to(School.findById(schoolId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(school);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateSchool = async (req, res) => {
  try {
    const schoolId = req.params;
    if (!schoolId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await School.update({ _id: schoolId }, req.body);
      const [err, school] = await to(School.findById(req.params.schoolId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(school);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteSchool = async (req, res) => {
  try {
    const result = await School.findByIdAndRemove(req.params.schoolId);
    res.send(result);
  } catch (err) {
    res.status(422).send(err);
  }
}

