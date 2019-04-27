const mongoose = require("mongoose");

const Chapter = mongoose.model("Chapter");

const contentRefresher = require("../refreshers/wupaiContent");
const { to } = require("../helpers/promise");
const { validationResult } = require("express-validator/check");

module.exports.getChapters = async (req, res) => {
  try {
    const [err, chapters] = await to(Chapter.find({}));
    if (err) {
      console.log(err);
      res.status(500).send({ err });
    }
    res.status(200).send(chapters);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

module.exports.addChapter = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    } else {
      const chapter = new Chapter(req.body);
      await chapter.save();
      res.status(200).send(chapter);
    }
  } catch (err) {
    res.send(err);
  }
}

module.exports.getChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    if (chapterId === "false") {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, chapter] = await to(
        Chapter.findById(chapterId).populate({
          path: "modules",
          populate: {
            path: "lessons"
          }
        })
      );
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(chapter);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

module.exports.updateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    if (!chapterId || Object.keys(req.body).length === 0) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      await Chapter.update({ _id: chapterId }, req.body);
      const [err, chapter] = await to(Chapter.findById(chapterId));
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      res.status(200).send(chapter);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

module.exports.deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    if (!chapterId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const [err, result] = await to(
        Chapter.findByIdAndRemove(req.params.chapterId)
      );
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      }
      await contentRefresher();
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(422).send(err);
  }
}
