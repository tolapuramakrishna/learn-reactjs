const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth");

router.get("/login", authController.login);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter valid email"),
    body(
      "password",
      "Password should be at least 5 characters and contain Alphanumeric"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);
router.get("/logout", authController.postLogout);
router.get("/signup", authController.signup);
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email"),
    body(
      "password",
      "Password should be at least 5 characters and contain Alphanumeric"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Password should match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.get("/reset", authController.reset);
router.post("/reset", authController.sendResetLink);
router.get("/update-password/:token", authController.updatePassword);
router.post("/update-password", authController.postUpdatePassword);
module.exports = router;
