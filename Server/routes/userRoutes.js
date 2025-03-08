const express = require("express");
const router = express.Router();
const { getUsers, getUser, registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../utils/AuthMiddleWare");

router.get("/", authMiddleware, getUsers);

router.get("/:id", getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile/:id", authMiddleware, getUserProfile);

module.exports = router;
