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
  },

  handle: {
    type: String,
    required: true,
    max: 40
  },

  company: {
    type: String
  },

  website: {
    type: String
  },

  status: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    required: true
  },

  bio: {
    type: String
  },

  githubusername: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ]
  
});

module.exports = agriexp = mongoose.model('agriexp', ProfileSchema);
