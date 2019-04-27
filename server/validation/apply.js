const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
  data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
  data.region = !isEmpty(data.region) ? data.region : ''
  data.city = !isEmpty(data.city) ? data.city : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.index = !isEmpty(data.index) ? data.index : ''

  if (data.univer_id === '0') {
    errors.error = 'Поле университет обязательно'
  }

  if (data.facultet_id === '0') {
    errors.error = 'Поле факультет обязательно'
  }

  if (data.special_id === '0') {
    errors.error = 'Поле специализация обязательно'
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.error = 'Поле имя обязательно'
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.error = 'Поле фамилия обязательно'
  }

  if (Validator.isEmpty(data.region)) {
    errors.error = 'Поле регион обязательно'
  }

  if (Validator.isEmpty(data.city)) {
    errors.error = 'Поле город обязательно'
  }

  if (Validator.isEmpty(data.address)) {
    errors.error = 'Поле адресс обязательно'
  }

  if (Validator.isEmpty(data.index)) {
    errors.error = 'Поле индекс обязательно'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
