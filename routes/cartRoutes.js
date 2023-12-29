const express = require('express');
const router = express.Router();

const {addToCart,removeFromCart,getCartItems, updateCartItem, deleteCartItem}  = require("../controllers/cartController")

router.route("/")
.get(getCartItems)
.patch(updateCartItem)
.delete(deleteCartItem);
router.route("/add").post(addToCart)



module.exports = router
