const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordReset(data) {
  let errors = {};
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(validator.isEmpty(data.password)){
    errors.password = 'password is requird '
  }
  if(validator.isEmpty(data.password2)){
    errors.password2 = 'confirm password is requird '
  }
  if (!validator.isLength(data.password, { min: 5, max: 40 })) {
    errors.password =
      "pasdword must be atleast 5 charecters";
  }

  if(!validator.equals(data.password,data.password2)){
    errors.password2= 'confirm password do not match '
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
