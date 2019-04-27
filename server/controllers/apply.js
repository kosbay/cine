const mongoose = require('mongoose');
const passport = require('passport');

const validateApplyInput = require('../validation/apply');
const Apply = require('../models/Apply');
const Univer = require('../models/University');
const Spec = require('../models/Spec')

module.exports.getAppliesByUniver = (req, res) => {
  Apply.find({ univer_id: req.params.univer_id, refuse: false, approved: false })
  .populate('facultet_id', 'fac_name')
  .populate('special_id', ['name', 'code'])
    .then(applies => {
      res.json(applies)
    })
    .catch(err => {
      res.status(404).json({ errors: 'Нет запросов' })
    })
}

module.exports.getAppliesByUser = async (req, res) => {
  let applies = await Apply.find({ user: req.user.id }).populate('univer_id', ['logo', 'addreviation']).populate('special_id', ['name'])
  if (!applies) return res.status(404).json({ errors: 'Нет запросов' });
  res.json(applies)
}

module.exports.approved = async (req, res) => {
  let apply = await Apply.findOne({ _id: req.params.id, approved: false });
  if (!apply) return res.status(404).json({ error: 'Нет заявки' })

  apply.approved = true;

  apply = apply.save();
  res.json(apply);
}

module.exports.refuse = async (req, res) => {
  let apply = await Apply.findOne({ _id: req.params.id, refuse: false })
  if (!apply) return res.status(404).json({ error: 'Нет заявки' })

  apply.refuse = true;
  apply.refuse_reason = req.body.reason;

  apply = apply.save();
  res.json(apply);
}

module.exports.addDocs = async (req, res) => {
  let apply = await Apply.findOne({ _id: req.params.id });

  apply.docs.push(req.body.data);

  apply = await apply.save();

  if(!apply) return res.status(404).json({ docs: 'Заявка не найдена' });

  res.json(apply)
}

module.exports.apply = async (req, res) => {
  const { errors, isValid } = validateApplyInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  let findApply = await Apply.findOne({ user: req.user.id, univer_id: req.body.univer_id })
  if (findApply) return res.status(400).json({ error: 'Вы уже подавали документы в этот ВУЗ' })

  const applyFields = {}
  applyFields.user = req.user.id
  if (req.body.firstname) applyFields.firstname = req.body.firstname
  if (req.body.lastname) applyFields.lastname = req.body.lastname
  if (req.body.fathername) applyFields.fathername = req.body.fathername
  if (req.body.sex) applyFields.sex = req.body.sex
  if (req.body.bornDate) applyFields.bornDate = req.body.bornDate
  if (req.body.school_name) applyFields.school_name = req.body.school_name
  if (req.body.num_of_school) applyFields.num_of_school = req.body.num_of_school
  if (req.body.univer_id) applyFields.univer_id = req.body.univer_id
  if (req.body.facultet_id) applyFields.facultet_id = req.body.facultet_id
  if (req.body.special_id) applyFields.special_id = req.body.special_id

  applyFields.location = {}
  if (req.body.country) applyFields.location.country = req.body.country
  if (req.body.region) applyFields.location.region = req.body.region
  if (req.body.city) applyFields.location.city = req.body.city
  if (req.body.address) applyFields.location.address = req.body.address
  if (req.body.index) applyFields.location.index = req.body.index

  new Apply(applyFields).save().then(async (apply) => {
    let spec = await Spec.findOne({ _id: apply.special_id });
    spec.apps = parseInt(spec.apps) + 1;
    spec = await spec.save();
    return res.json(apply)
  })
};

module.exports.deleteApply = async (req, res) => {
  const apply = await Apply.findByIdAndDelete(req.params.id);

  if(!apply) return res.send(404).json({ error: "Нет такого заявления" });

  res.send(apply);
}
