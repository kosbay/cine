/*eslint-disable */
const URL_REGEX =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
/* eslint-enable */
const ValidationUtils = {
  validateUrl: candidate => URL_REGEX.test(candidate),
  isStringContentEqual: (a, b) => `${a}`.toString().replace(/\s/g, '') === `${b}`.replace(/\s/g, ''),
};

export default ValidationUtils;
