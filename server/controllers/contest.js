const mongoose = require("mongoose");

const Contest = mongoose.model("Contest");

const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");

module.exports.getContests = async (req, res) => {
  try {
    const [err, contests] = await to(Contest.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(contests);
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
}

module.exports.addContest = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const contest = await new Contest(req.body);
      await contest.save();
      res.status(200).send(contest);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateContest = async (req, res) => {
  try {
    const { contestId } = req.params;
    if (!contestId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Contest.update({ _id: contestId }, req.body);
      const [err, contest] = await to(Contest.findById(contestId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(contest);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteContest = async (req, res) => {
  try {
    const { contestId } = req.params;
    if (!contestId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(Contest.findByIdAndRemove(contestId));
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

