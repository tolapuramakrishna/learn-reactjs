const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth')

router.get("/login", authController.login);
router.post("/login", authController.postLogin);
router.get("/logout", authController.postLogout);
module.exports = router;
