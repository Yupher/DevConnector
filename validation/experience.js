const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExpInput(data){
  let errors = {}
  data.title = !isEmpty(data.title) ? data.title : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.from = !isEmpty(data.from) ? data.from : ''

  if(validator.isEmpty(data.title)) errors.title = 'title required'
  if(validator.isEmpty(data.company))  errors.company = 'company required'
  if(validator.isEmpty(data.from))  errors.from = 'from date required'

  return{
    errors,
    isValid: isEmpty(errors)
  }
}