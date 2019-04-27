const { body } = require("express-validator/check");

const validate = () => [
  body("name", "Имя не отправлено")
    .exists()
    .trim(),
  body("name", "Поле Имя должно быть String").custom(
    value => typeof value === "string"
  ),
  body("lessons", "Поле Lessons должно быть Array").custom(value => {
    if (value) {
      return Array.isArray(value);
    }
    return true;
  }),
  body("skills", "Поле Skills должно быть Array").custom(value => {
    if (value) {
      return Array.isArray(value);
    }
    return true;
  }),
  body("wupai", "Поле Wupai должно быть Number").custom(value => {
    if (value) {
      return typeof value === "number";
    }
    return true;
  })
];

module.exports = { validate };
