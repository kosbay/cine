const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.univer_name = !isEmpty(data.univer_name) ? data.univer_name : ''
  data.addreviation = !isEmpty(data.addreviation) ? data.addreviation : ''
  data.description = !isEmpty(data.description) ? data.description : ''
  data.category = !isEmpty(data.category) ? data.category : ''
  data.code = !isEmpty(data.code) ? data.code : ''
  data.type = !isEmpty(data.type) ? data.type : ''
  data.license = !isEmpty(data.license) ? data.license : ''
  data.region = !isEmpty(data.region) ? data.region : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.o_email = !isEmpty(data.o_email) ? data.o_email : ''

  if (Validator.isEmpty(data.univer_name)) {
    errors.univer_name = 'Поле название объязательно'
  }

  if (Validator.isEmpty(data.addreviation)) {
    errors.addreviation = 'Поле аббревиатура объязательно'
  }

  if (!Validator.isLength(data.description, { min: 150 })) {
    errors.description = 'Не меньше 150 символов';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Объязательное поле'
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Поле категория объязательно'
  }

  if (Validator.isEmpty(data.code)) {
    errors.code = 'Поле код объязательно'
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Поле тип объязательно'
  }

  if (Validator.isEmpty(data.license)) {
    errors.license = 'Поле номер лицензии объязательно'
  }

  if (Validator.isEmpty(data.region)) {
    errors.region = 'Поле город объязательно'
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Поле адрес объязательно'
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Поле номер объязательно'
  }

  if (Validator.isEmpty(data.o_email)) {
    errors.o_email = 'Поле электронная почта объязательно'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
