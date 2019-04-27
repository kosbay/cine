const mongoose = require("mongoose");

const Module = mongoose.model("Module");
const Lesson = mongoose.model("Lesson");

const contentRefresher = require("../refreshers/wupaiContent");
const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");

module.exports.removeModulesWupais = async (req, res) => {
  try {
    await Module.update({}, { $set: { wupai: 0 } }, { multi: true }).exec();
    res.status(200).send("Successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getModules = async (req, res) => {
  try {
    const [err, modules] = await to(Module.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(modules);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addModule = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const module = new Module(req.body);
      await module.save();
      res.status(200).send(module);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    if (!moduleId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const module = await Module.findById(moduleId).populate("lessons");
      res.status(200).send(module);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    if (!moduleId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Module.update({ _id: moduleId }, req.body, {
        multi: true
      });
      const module = await Module.findById(req.params.moduleId);
      res.status(200).send(module);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addModulesLesson = async (req, res) => {
  let lesson = new Lesson(req.body);

    try {
      lesson = await lesson.save();
      const module = await Module.findById(req.params.moduleId);
      module.lessons.push(lesson._id);
      await module.save();
      contentRefresher();
      res.send(await Module.findById(req.params.moduleId).populate("lessons"));
    } catch (err) {
      res.status(422).send(err);
    }
}

module.exports.updateModulesLesson = async (req, res) => {
  try {
    await Lesson.update({ _id: req.params.lessonId }, req.body);
    contentRefresher([req.params.lessonId]);
    res.send(
      await Module.findById(req.params.moduleId).populate("lessons")
    );
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.deleteModulesLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndRemove(req.params.lessonId);
    const module = await Module.findById(req.params.moduleId);

    // remove lesson from module
    module.lessons.pull(req.params.lessonId);
    await contentRefresher();
    res.send(
      await Module.findById(req.params.moduleId).populate("lessons")
    );
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.deleteModule = async (req, res) => {
  try {
    const result = await Module.findByIdAndRemove(req.params.moduleId);
    await contentRefresher();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
