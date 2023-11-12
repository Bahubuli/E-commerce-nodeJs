const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");
const {
  getAllProducts,
  getSinglProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const {getSingleProductReviews} = require("../controllers/reviewController")

const express = require("express");
const router = express.Router();

router
    .route("/")
    .post([authenticateUser, authorizePermission("admin")], createProduct)
    .get(getAllProducts)


router
    .route("/:id")
    .get(getSinglProduct)
    .patch([authenticateUser,authorizePermission("admin")],updateProduct)
    .delete([authenticateUser,authorizePermission("admin")],deleteProduct)

router.route("/:id/reviews").get(getSingleProductReviews)

router
    .route("/uploadImage")
    .post([authenticateUser,authorizePermission("admin")],uploadImage)


module.exports = router;
