const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userController");
const router = express.Router();

// register user
router.post("/register",registerUser)

// login 
router.post("/login",authUser)

// all user
router.get(protect,allUsers);

module.exports = router