const { body } = require("express-validator/check");

const validate = () => [
  body("name", "Имя не отправлено")
    .exists()
    .trim(),
  body("name", "Поле Имя должно быть String").custom(
    value => typeof value === "string"
  ),
  body("description", "Описание не отправлено")
    .exists()
    .trim(),
  body("description", "Поле Описание должно быть String").custom(
    value => typeof value === "string"
  ),
  body("date", "Дата не отправлено").exists()
];

module.exports = { validate };
