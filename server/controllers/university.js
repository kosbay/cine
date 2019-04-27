const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../validation/university')
const University = require('../models/University')
const User = require('../models/User')

module.exports.univer = async (req, res) => {
  let univer = await University.findOne({ user: req.user.id })
  if(!univer) return res.status(404).json({ error: 'Нет профилья для этого юзера' })
  res.json(univer)
}

module.exports.univers = (req, res) => {
  const errors = {};

  University.find()
    .then(univers => {
      if (!univers) {
        errors.noprofile = 'Нет профилья'
        return res.status(404).json(errors)
      }

      res.json(univers)
    })
    .catch(err => res.status(404).json({ errors: 'Нет профилей' }))
}

module.exports.universTop = async (req, res) => {
  const errors = {};

  let univers = await University.find().limit(4)
  if (!univers) return res.status(404).json({ error: 'Нет профилья' })
  res.json(univers);
}

module.exports.getUniver = (req, res) => {
  const errors = {}

  University.findOne({ _id: req.params._id })
    .then(univer => {
      if (!univer) {
        errors.noprofile = 'Нет такого университета'
        return res.status(404).json(errors)
      }

      res.json(univer)
    })
    .catch(err =>
      res.status(404).json({ errors: 'Нет такого университета' })
    )
}

module.exports.addLogo = async (req, res) => {

  const univer = await University.findOneAndUpdate(
    { user: req.user.id },
    { $set: { logo: req.body.data.url } },
    { new: true }
  )

  return res.json(univer)
}

module.exports.addWall = async (req, res) => {

  const univer = await University.findOneAndUpdate(
    { user: req.user.id },
    { $set: { wallpapper: req.body.data.url } },
    { new: true }
  );

  return res.json(univer)
}

module.exports.univerProfile = async (req, res) => {
  const errors = {};

  const univerFields = {}
  univerFields.user = req.user.id
  if (req.body.logo) univerFields.logo = req.body.logo.data.url
  if (req.body.wallpapper) univerFields.wallpapper = req.body.wallpapper.data.url
  if (req.body.univer_name) univerFields.univer_name = req.body.univer_name
  if (req.body.addreviation) univerFields.addreviation = req.body.addreviation
  if (req.body.category) univerFields.category = req.body.category
  if (req.body.code) univerFields.code = req.body.code
  if (req.body.type) univerFields.type = req.body.type
  if (req.body.license) univerFields.license = req.body.license
  if (req.body.expire) univerFields.expire = req.body.expire
  if (req.body.description) univerFields.description = req.body.description
  if (req.body.phone) univerFields.phone = req.body.phone
  if (req.body.o_email) univerFields.o_email = req.body.o_email
  if (req.body.website) univerFields.website = req.body.website

  univerFields.location = {}
  if (req.body.country) univerFields.location.country = req.body.country
  if (req.body.region) univerFields.location.region = req.body.region
  if (req.body.address) univerFields.location.address = req.body.address
  if (req.body.lat) univerFields.location.lat = req.body.lat
  if (req.body.lng) univerFields.location.lng = req.body.lng

  univerFields.social = {}
  if (req.body.fb) univerFields.social.fb = req.body.fb
  if (req.body.insta) univerFields.social.insta = req.body.insta
  if (req.body.twitter) univerFields.social.twitter = req.body.twitter
  if (req.body.vk) univerFields.social.vk = req.body.vk
  if (req.body.youtube) univerFields.social.youtube = req.body.youtube
  if (req.body.other) univerFields.social.other = req.body.other

  University.findOne({ user: req.user.id }).then( async (univer) => {
    if (univer) {
      exist = await University.findOneAndUpdate(
        { user: req.user.id },
        { $set: univerFields },
        { new: true }
      )
      .then(univer => {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: { profile: univer._id } },
          { new: true }
        ).then(user => res.json(univer))
      })
    }

    if(univer) return;

    const { errors, isValid } = validateProfileInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    University.findOne({ o_email: univerFields.email }).then(univer => {
      if (univer) {
        errors.handle = 'Уже есть'
        return res.status(400).json(errors)
      }

      new University(univerFields).save().then(univer => {
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: { profile: univer._id } },
          { new: true }
        ).then(user => res.json(univer))
      })
    })
  })
}

module.exports.editDesc = async (req, res) => {
  let profile = await University.findOneAndUpdate(
    { user: req.user.id },
    { description: req.body.desc },
    { new: true }
  )
  if(!profile) return res.status(404).json({ error: 'Не найдено' })
  res.json(profile);
}

module.exports.count = (req, res) => {
  University.count()
    .then(count => {
      res.json(count)
    })
}
