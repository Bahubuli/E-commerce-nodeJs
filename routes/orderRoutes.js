const express = require('express');
const router = express.Router();

// const {
//   authenticateUser,
//   authorizePermissions,
// } = require('../middleware/authentication');

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  addOrder,
  finishOrder
} = require('../controllers/orderController');

// authenticateUser, authorizePermissions('admin'),
router
  .route('/')
  .post(addOrder)
  .get(getCurrentUserOrders);

//router.route('/showMyOrders').get(authenticateUser, getCurrentUserOrders);
router.route("/finish-order")
.post(finishOrder)
// authenticateUser
router
  .route('/:id')
  .get( getSingleOrder)
  .patch( updateOrder);

module.exports = router;
