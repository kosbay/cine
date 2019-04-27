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
  body("description", "Описание не отправлено").trim(),
  body("description", "Поле Описание должно быть String").custom(value => {
    if (value) {
      return typeof value === "string";
    }
    return true;
  }),
  body("modules", "Поле Modules должно быть Array").custom(value => {
    if (value) {
      return Array.isArray(value);
    }
    return true;
  })
];

module.exports = { validate };
