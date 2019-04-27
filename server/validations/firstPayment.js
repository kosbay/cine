const { body } = require("express-validator/check");

const validate = () => [
  body("Account", "Сумма платежа не отправлена")
    .exists()
    .isNumeric()
    .trim(),
  body("Name", "Проверьте поле Name!")
    .exists()
    .custom(value => {
      if (value) {
        return typeof value === "string";
      }
      return true;
    })
    .trim(),
  body("CardCryptogramPacket", "Проверьте поле CardCryptogramPacket!")
    .exists()
    .custom(value => {
      if (value) {
        return typeof value === "string";
      }
      return true;
    })
    .trim(),
  body("Email", "Проверьте поле Email!")
    .isEmail()
    .custom(value => {
      if (value) {
        return typeof value === "string";
      }
      return true;
    })
];

module.exports = { validate };