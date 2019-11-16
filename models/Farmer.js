const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    // users as in routers/api/users
    // Change it according to your file references
    ref: 'users'
    
  },
  
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },
  
  mobilenumber: {
    type: String
  },

  email: {
    type: String
  },

  street: {
    type: String
  },

  city: {
    type: String
  },

  state: {
    type: String
  },

  pincode: {
    type: String
  },

  type: {
    type: String
  }

});

module.exports = Farmer = mongoose.model('Farmer', ProfileSchema);
