const express = require('express');
const {
  getReviewsByRestId,
  createReviewByRestId,
  updateReviewByRestId,
  deleteReviewByRestId,
  restrictToRegularUserMW,
} = require('../controllers/reviewController');
const { protectMW } = require('../controllers/authController');

const router = express.Router();

router
  .route('/:id')
  .get(getReviewsByRestId)
  .post(protectMW, restrictToRegularUserMW, createReviewByRestId)
  .put(protectMW, restrictToRegularUserMW, updateReviewByRestId)
  .delete(protectMW, restrictToRegularUserMW, deleteReviewByRestId);

module.exports = router;
