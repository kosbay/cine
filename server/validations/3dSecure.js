const { body } = require("express-validator/check");

const validate3dSecure = () => [
  body("TransactionId", "Проверьте поле TransactionId!")
    .exists()
    .isNumeric()
    .trim(),
  body("PaRes", "Проверьте поле PaRes!")
    .exists()
    .custom(value => {
      if (value) {
        return typeof value === "string";
      }
      return true;
    })
    .trim()
];

module.exports = { validate3dSecure };