const mongoose = require('mongoose');

const Profile = mongoose.Schema({
  age: Number,
  male: {
    type: String,
    enum: ['male', 'female']
  }
});

module.exports = mongoose.model('Profile', Profile)
