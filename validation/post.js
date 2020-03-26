const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';
  if (validator.isEmpty(data.text)) errors.text = 'can not post an empty post '

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
