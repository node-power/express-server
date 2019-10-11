const mongoose = require('mongoose');
const User = require('./../models/User');
const Profile = require('./../models/Profile');
const { createToken } = require('./../helpers/jwt');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, age, male } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      const profile = new Profile({
        _id: mongoose.Types.ObjectId(),
        age,
        male
      });
      await profile.save();

      const user = new User({
        email,
        password,
        profile: profile._id
      });
      await user.save();

      const newUser = await User.findOne({ email });

      res.json({ user: newUser.getCleanUser() });
    } catch(e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate('profile');

      if (!user) {
        return res.status(404).json({ message: 'User doesn`t exist.' });
      }

      if (!await user.comparePassword(password)) {
        return res.status(400).json({ message: 'Invalid password.' });
      }

      const token = createToken(user);
      res.status(201).json({ token, user: user.getCleanUser() });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
