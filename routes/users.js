const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const User = require("../models/user");
const catchAsync = require("../utills/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo, //local 이외 여러개 설정할 수 있음 google이나 twitter /
    passport.authenticate("local", {
      failureFlash: true, //flash 메세지를 자동으로 띄움
      failureRedirect: "/login", // 리다이렉트
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
