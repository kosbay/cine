const { body } = require("express-validator/check");

const validate = () => [
  body("name", "Поле Имя должно быть String")
    .custom(value => {
      if (value) {
        return typeof value === "string";
      }
      return true;
    })
    .trim(),
  body("username", "Username не отправлено")
    .exists()
    .trim(),
  body("username", "Поле Username должно быть String").custom(value => {
    if (value) {
      return typeof value === "string";
    }
    return true;
  }),
  body("username", "To LowerCase").customSanitizer(value => {
    if (value) {
      return value.toLowerCase();
    }
    return value;
  }),
  body("password", "Паспорт не отправлено")
    .exists()
    .trim(),
  body("password", "Поле Password должно быть String").custom(value => {
    if (value) {
      return typeof value === "string";
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
