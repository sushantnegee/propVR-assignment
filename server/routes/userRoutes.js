const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");
const router = express.Router();

// register user
router.post("/register",registerUser)

// login 
router.post("/login",authUser)

module.exports = router