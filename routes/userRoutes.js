const express = require("express");
const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require("../controllers/userController");
const router = express.Router();

const     {authenticateUser,
authorizePermission} = require("../middleware/authentication")

router.route("/").get(authenticateUser,authorizePermission("admin","owner"),getAllUsers);

router.route("/showme").get(authenticateUser,showCurrentUser)

router.route("/updateUser").patch(authenticateUser,updateUser)

router.route("/updateUserPassword").patch(authenticateUser,updateUserPassword)

router.route("/:id").get(authenticateUser,getSingleUser);


module.exports = router;
