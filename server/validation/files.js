const isEmpty = require('./is-empty')

module.exports = function validateApplyInput(data) {
  let errors = {}

  data.file1 = !isEmpty(data.file1) ? data.file1 : ''
  data.file2 = !isEmpty(data.file2) ? data.file2 : ''
  data.file3 = !isEmpty(data.file3) ? data.file3 : ''
  data.file4 = !isEmpty(data.file4) ? data.file4 : ''
  data.file5 = !isEmpty(data.file5) ? data.file5 : ''

  if (data.file1.length === 0) {
    errors.file1 = 'Вы не загрузили Удостоверение личности.'
  }

  if (data.file2.length === 0) {
    errors.file2 = 'Вы не загрузили фото 3х4.'
  }

  if (data.file3.length === 0) {
    errors.file3 = 'Вы не загрузили Медицинскую справку 086-У.'
  }

  if (data.file4.length === 0) {
    errors.file4 = 'Вы не загрузили Приписное свидетельство (военкомат).'
  }

  if (data.file5.length === 0) {
    errors.file5 = 'Вы не загрузили Аттестат и Сертификат о ЕНТ.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
