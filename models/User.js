const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
  email: String,
  password: String,
  profile: {
    type: mongoose.Types.ObjectId,
    ref: 'Profile'
  },
  orders: [{
    type: mongoose.Types.ObjectId,
    ref: 'Order'
  }]
});

User.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

User.methods.getCleanUser = function() {
  const { password, ...user } = this._doc;
  return user;
};

User.methods.comparePassword = async function(password) {
  console.log(await bcrypt.compare(password, this.password))
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);
