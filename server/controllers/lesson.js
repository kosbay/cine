const mongoose = require("mongoose");

const Lesson = mongoose.model("Lesson");
const Module = mongoose.model("Module");

const contentRefresher = require("../refreshers/wupaiContent");
const { to } = require("../helpers/promise");

module.exports.getLessons = async (req, res) => {
  try {
    const [err, lessons] = await to(Lesson.find({}).lean());
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(lessons);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.addLesson = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const lesson = new Lesson(req.body);
      await lesson.save();
      await contentRefresher();
      res.status(200).send(lesson);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, lesson] = await to(Lesson.findById(lessonId).lean());
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(lesson);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Lesson.update({ _id: lessonId }, req.body);
      const [err, lesson] = await to(
        Lesson.findById(req.params.lessonId).lean()
      );
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(lesson);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    if (!lessonId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(Lesson.findByIdAndRemove(lessonId));
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

module.exports.moveLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { prevModule, nextModule } = req.query;
    if (!lessonId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Module.update(
        { _id: prevModule },
        { $pull: { lessons: lessonId } },
        { multi: true }
      );
      await Module.update(
        { _id: nextModule },
        { $push: { lessons: lessonId } },
        { multi: true }
      );
      await contentRefresher();
    }
    res.status(200).send("Урок перемещен!");
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
