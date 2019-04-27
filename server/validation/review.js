const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRevInput(data) {
  let errors = {};

  data.review = !isEmpty(data.review) ? data.review : '';

  if (Validator.isEmpty(data.review)) {
    errors.review = 'Обьязательное поле'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
