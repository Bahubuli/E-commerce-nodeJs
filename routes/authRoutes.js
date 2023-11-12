const {register,login,logout} = require("../controllers/authController")
const express = require("express");
const router = express.Router();

router.post("/register",register)
      .post("/login",login)
      .get("/logout",logout)

module.exports = router;
