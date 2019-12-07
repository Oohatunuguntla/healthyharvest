const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.street = !isEmpty(data.street) ? data.street : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.pincode = !isEmpty(data.pincode) ? data.pincode : '';

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = 'username needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Profile username is required';
  }


  if (!Validator.isLength(data.mobilenumber, { min: 8, max: 12 })) {
    errors.mobilenumber = 'Mobilenumber needs to between 8 and 12 characters';
  }

  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = 'Mobilenumber is required';
  }

  if (!Validator.isLength(data.street, { min: 2, max: 50 })) {
    errors.street = 'Handle needs to between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.street)) {
    errors.street = 'Street is required';
  }

  if (!Validator.isLength(data.city, { min: 5, max: 20 })) {
    errors.city = 'City needs to between 5 and 20 characters';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City is required';
  }

  if (!Validator.isLength(data.email, { min: 10, max: 25 })) {
    errors.email = 'Email needs to between 5 and 25 characters';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(data.state, { min: 5, max: 20 })) {
    errors.state = 'State needs to between 5 and 20 characters';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'State is required';
  }

  if (!Validator.isLength(data.pincode, { min: 6, max: 10 })) {
    errors.pincode = 'Pincode needs to between 6 and 10 characters';
  }

  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = 'Pincode is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
