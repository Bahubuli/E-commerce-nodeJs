const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const {authenticateUser} = require("../middleware/authentication")


router.route("/")
.get(getAllReviews)
.post(authenticateUser,createReview)

router.route("/:id")
.delete(authenticateUser,deleteReview)
.patch(authenticateUser,updateReview)
.get(authenticateUser,getSingleReview)


module.exports = router
