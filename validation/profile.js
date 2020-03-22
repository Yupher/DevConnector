const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
  if(!validator.isLength(data.handle, {min: 5, max: 15})){
    errors.handle = 'handle must be between 5 and 15 characters'
  }
  if(validator.isEmpty(data.handle)){
    errors.handle = 'handle is required'
  }
  if(validator.isEmpty(data.status)){
    errors.status = 'status is required'
  }
  if(validator.isEmpty(data.skills)){
    errors.skills = 'skills is required'
  }

  if(!isEmpty(data.website)){
    if(!validator.isURL(data.website)){
      errors.website = 'website not valid'
    }
  }
  if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)){
      errors.facebook = 'facebook link not valid'
    }
  }
  if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
      errors.youtube = 'youtube link not valid'
    }
  }
  if(!isEmpty(data.instagram)){
    if(!validator.isURL(data.instagram)){
      errors.instagram = 'instagram link not valid'
    }
  }
  if(!isEmpty(data.twitter)){
    if(!validator.isURL(data.twitter)){
      errors.twitter = 'twitter link not valid'
    }
  }
  if(!isEmpty(data.linkedin)){
    if(!validator.isURL(data.linkedin)){
      errors.linkedin = 'linkedin link not valid'
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
