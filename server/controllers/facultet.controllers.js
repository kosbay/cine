const mongoose = require("mongoose");
const passport = require("passport");

const validateFacInput = require("../validation/fac");
const University = require("../models/University");
const Facultet = require("../models/Facultet");
const Spec = require("../models/Spec");
const User = require("../models/User");

module.exports.getFacsByUniver = (req, res) => {
  Facultet.find({ univer: req.params.id })
    .populate("specs")
    .then(facs => {
      if (!facs) {
        errors.nofacs = "Нет факультетов";
        return res.status(404).json(errors);
      }

      res.json(facs);
    })
    .catch(err => res.status(404).json({ errors: "Нет факультетов" }));
};

module.exports.getSpecsByUniver = (req, res) => {
  Spec.find({ univer: req.params.id })
    .populate("facultet", ["fac_name"])
    .then(specs => {
      if (!specs) {
        return res.status(404).json({ errors: "Нет специализации" });
      }

      res.json(specs);
    })
    .catch(err => res.status(404).json({ errors: "Нет специализации" }));
};

module.exports.getSpecsByFac = (req, res) => {
  Spec.find({ facultet: req.params.id })
    .populate("facultet", ["fac_name"])
    .then(specs => {
      if (!specs) {
        return res.status(404).json({ errors: "Нет специализации" });
      }

      res.json(specs);
    })
    .catch(err => res.status(404).json({ errors: "Нет специализации" }));
};

module.exports.topSpecs = async (req, res) => {
  let specs = await Spec.find({})
    .limit(3)
    .populate("univer", ["univer_name"])
    .populate("facultet", ["fac_name"]);
  if (!specs) return res.status(404).json({ error: "Нет специальностей" });
  res.json(specs);
};

module.exports.addFacSpecs = async (req, res) => {
  const { errors, isValid } = validateFacInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let university = await University.findOne({ user: req.user.id });
  if (!university)
    return res.status(404).json({ errors: "Нет такого университета" });

  const newFac = {
    univer: university._id,
    fac_name: req.body.fac
  };

  let facultet = new Facultet(newFac);
  if (!facultet)
    return res.status(400).json({ errors: "Не правильно заполнены поля!" });

  let specs = req.body.specs.map(async spec => {
    const newSpec = {
      name: spec.name,
      code: spec.code,
      staff_1: spec.staff_1,
      staff_2: spec.staff_2,
      univer: university._id,
      facultet: facultet._id
    };
    let special = new Spec(newSpec);
    if (!special)
      return res.status(400).json({ errors: "Не правильно заполнены поля!" });
    special = await special.save();
    facultet.specs.push(special._id);
  });

  await Promise.all(specs);
  facultet = await facultet.save();

  res.json({ success: true });
};

module.exports.putSpec = async (req, res) => {
  const newSpec = {
    name: req.body.name,
    code: req.body.code,
    staff_1: req.body.staff_1,
    staff_2: req.body.staff_2
  };

  let spec = await Spec.findByIdAndUpdate(req.params.id, newSpec, {
    new: true
  });
  if (!spec) return res.status(404).json({ error: "Не найдено" });

  res.json(spec);
};

module.exports.deleteFac = async (req, res) => {
  let fac = await Facultet.findById(req.params.id);
  const specs = await Spec.deleteMany({ facultet: fac._id });
  if (!fac) return res.status(404).json({ error: "Не найден" });
  fac = await Facultet.findByIdAndRemove(req.params.id);
  res.json(fac);
};

module.exports.deleteSpec = async (req, res) => {
  const spec = await Spec.findByIdAndRemove(req.params.id);
  if (!spec) return res.status(404).json({ error: "Не найден" });
  res.json(spec);
};
