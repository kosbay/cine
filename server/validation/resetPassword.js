const User = require('../models/User')
const Validator = require('validator')
const tokenLength = require('../config/keys').resetPasswordTokenLength

async function isUserExist (email) {
  const errors = {}
  if (!email) {
    errors.noEmailProvided = 'Необходимо ввести свою почту'
    return {payload: errors, valid: false}
  }else if(!Validator.isEmail(email)){
    errors.invalidEmail = 'Неправильный email'
    return {payload: errors, valid: false}
  }

  const user = await User.findOne({email})

  if(!user){

    errors.noSuchEmail = 'Такого email нет'
    return {payload: errors, valid: false}
  }else{
    return {payload: user, valid: true}
  }
}

async function validateTokenAndPassword(token, password, password2){
  const errors = {}

  if(!token){
    errors.noTokenProvided = 'Утерян Токен'
    return {payload: errors, valid: false}
  }

  if(!password || !password2){
    errors.noPasswordProvided = 'Введите пароля два раза'
    return {payload: errors, valid: false}
  }

  if(password!==password2){
    errors.wrongPassword = 'Пароли не совпадают'
    return {payload: errors, valid: false}
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Пароль не должен быть меньше 6 символов'
    return {payload: errors, valid: false}
  }

  const query = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  })

  const tokenInfo = await query

  if(!tokenInfo){

    errors.expiredToken = 'Токен неправильный или истек'
    return {payload: errors, valid: false}
  }else{
    return {payload: tokenInfo, valid: true}
  }
}

module.exports = {
  isUserExist,
  validateTokenAndPassword
}