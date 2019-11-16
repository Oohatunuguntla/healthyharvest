const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.street = !isEmpty(data.street) ? data.street : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.pincode = !isEmpty(data.pincode) ? data.pincode : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  

  if (!Validator.isLength(data.firstName, { min: 2, max: 40 })) {
    errors.firstName = 'firstName needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Profile firstName is required';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 40 })) {
    errors.lastName = 'lastName needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Profile lastName is required';
  }

  if (!Validator.isLength(data.mobilenumber, { min: 8, max: 12 })) {
    errors.mobilenumber = 'Mobilenumber needs to between 8 and 12 characters';
  }

  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = 'Mobilenumber is required';
  }

  if (!Validator.isLength(data.email, { min: 10, max: 25 })) {
    errors.email = 'Email needs to between 5 and 25 characters';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
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

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Type is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
