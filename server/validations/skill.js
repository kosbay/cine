const { body } = require("express-validator/check");

const validate = () => [
  body("name", "Имя не отправлено")
    .exists()
    .trim(),
  body("name", "Поле Имя должно быть String").custom(value => {
    if (value) {
      return typeof value === "string";
    }
    return true;
  }),
  body("type", "Тип не отправлено")
    .exists()
    .trim(),
  body("skillPoint", "Значение должно быть Number").custom(value => {
    if (value) {
      return typeof value === "number";
    }
    return true;
  })
];

module.exports = { validate };
