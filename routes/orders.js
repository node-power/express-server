const router = require('express').Router();
const { OrdersController } = require('./../controllers');
const { authCheck } = require('./../helpers/jwt');

router
  .use(authCheck)
  .post('/', OrdersController.create);

module.exports = router;
