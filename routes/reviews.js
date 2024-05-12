const express = require("express");
const router = express.Router({ mergeParams: true }); // 라우터에 id를 포함하면서 생긱 문제를 해결해줌 이거 안 넣고 하면 req.parms에 값이 아예 없음
const reviews = require("../controllers/reviews");
const catchAsync = require("../utills/catchAsync");

const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
