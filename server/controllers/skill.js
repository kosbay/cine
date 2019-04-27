const mongoose = require("mongoose");

const Skill = mongoose.model("Skill");
const UserSkills = mongoose.model("UserSkills");

const { to } = require("../helpers/promise");

module.exports.getSkills = async (req, res) => {
  try {
    const [err, skills] = await to(Skill.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(skills);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addSkill = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const skill = new Skill(req.body);
      await skill.save();
      res.status(200).send(skill);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const skill = await Skill.findById(skillId);
      res.status(200).send(skill);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Skill.update({ _id: req.params.skillId }, req.body);
      const skill = await Skill.findById(req.params.skillId);
      res.status(200).send(skill);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    if (!skillId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await Skill.findByIdAndRemove(skillId);
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

module.exports.getUserSkill = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const userSkills = await UserSkills.find({ userId }).populate(
        "skillId"
      );
      res.status(200).send(userSkills);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

