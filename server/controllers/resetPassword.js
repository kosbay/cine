const mailer = require("nodemailer")
const randomString = require('crypto-random-string')
const User = require('../models/User')
const Validator = require('validator')
const tokenLength = require('../config/keys').resetPasswordTokenLength
const bcrypt = require('bcryptjs')

const foo = require('../validation/resetPassword')

const sendToken = async (req, res) => {

  const isValid = await foo.isUserExist(req.body.email)


  if (isValid.valid) {
    const token = randomString(tokenLength)
    const user = isValid.payload
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000

    const query = user.save()
    const result = await query

    let smtpTransport = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "nurzhanovd10@gmail.com",
        pass: "qwertyasd1"
      }
    });

    let mail = {
      from: "automato",
      to: user.email,
      subject: "Onelife",
      text: "Onelife",
      html: `http://${req.headers.host}/auth/reset/${token}`
    }

    smtpTransport.sendMail(mail, function (error, response) {
      if (error) {
        return res.status(404)
      } else {
        return res.json({
          success: true
        })
      }

      smtpTransport.close();
    })
  } else {
    const errors = isValid.payload
    res.status(400).json({
      errors
    })
  }
}

const resetPassword = async (req, res) => {

  const isValid = await foo.validateTokenAndPassword(req.body.token, req.body.newPassword, req.body.newPassword2)


  if (isValid.valid) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
        const user = isValid.payload
        if (err) throw err
        user.password = hash
        user.resetPasswordExpires = undefined
        user.resetPasswordToken = undefined
        user
          .save()
          .then(user => res.status(200).json({
            success: true
          }))
          .catch(err => console.log(err))
      })
    })
  } else {
    const errors = isValid.payload
    res.status(400).json({
      errors
    })
  }


}

module.exports = {
  sendToken,
  resetPassword
}
