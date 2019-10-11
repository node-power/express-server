const mongoose = require('mongoose');
const Order = require('./../models/Order');

class OrdersController {
  async create(req, res, next) {
    try {
      const user = req.user;

      const { title } = req.body;

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        title
      });
      await order.save();

      user.orders.push(order._id);
      await user.save();

      res.json({ order });
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new OrdersController();
