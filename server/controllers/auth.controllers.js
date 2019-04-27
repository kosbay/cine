const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const mailer = require("nodemailer")

const validateRegisterInput = require('../validation/registration')
const validateLoginInput = require('../validation/login')
const keys = require('../config/keys')

const User = require('../models/User')

module.exports.registration = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Такой email уже есть'
      return res.status(400).json(errors)
    } else {

      const newUser = new User({
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

module.exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'Пользователь не найден'
      return res.status(404).json(errors)
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          profile: user.profile
        }

        jwt.sign(
          payload,
          keys.SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Неправильный пароль'
        return res.status(400).json(errors)
      }
    })
  })
}

module.exports.current = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
}
