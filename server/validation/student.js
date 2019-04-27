const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateStudentInput(data) {
  let errors = {}

  data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
  data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
  data.school_name = !isEmpty(data.school_name) ? data.school_name : ''
  data.school_number = !isEmpty(data.school_number) ? data.school_number : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.region = !isEmpty(data.region) ? data.region : ''
  data.index = !isEmpty(data.index) ? data.index : ''

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Поле email объязательно'
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Неправильный email'
  }

  if (Validator.isEmpty(data.school_name)) {
    errors.school_name = 'Поле пароль объязательно'
  }

  if (Validator.isEmpty(data.school_number)) {
    errors.school_number = 'Поле потвердить пароль объязательно'
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Пароль не должен быть меньше 6 символов'
  }

  if (Validator.isEmpty(data.region)) {
    errors.region = 'Поле потвердить пароль объязательно'
  }

  if (Validator.isEmpty(data.index)) {
    errors.index = 'Пароли должны совподать'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
