const { body } = require("express-validator/check");

const validate = () => [
  body("userId", "userId не отправлено!")
    .exists()
    .trim(),
  body("lessonId", "lessonId не отправлено!")
    .exists()
    .trim()
];

module.exports = { validate };
