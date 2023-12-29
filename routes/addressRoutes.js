const express = require('express');
const router = express.Router();

const { addAddress, getUserAddress, removeAddress, updateAddress } = require('../controllers/addressController');

router
  .route('/')
  .post(addAddress)
  .get(getUserAddress)
  .delete(removeAddress)
  .patch(updateAddress);


module.exports = router;
