const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.specs.map((spec, idx) => {
    if(spec.name === '') {
      const text = `name_of_spec${idx}`;
      errors[text] = 'Объязательное поле';
    }

    if(spec.code === '') {
      const text = `code${idx}`;
      errors[text] = 'Объязательное поле';
    }

    if(spec.staff_1 === '') {
      const text = `staff_1${idx}`;
      errors[text] = 'Объязательное поле';
    }

    if(spec.staff_2 === '') {
      const text = `staff_2${idx}`;
      errors[text] = 'Объязательное поле';
    }
  })

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
