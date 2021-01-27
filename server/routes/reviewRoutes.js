const express = require('express');
const {
  getReviewsByRestId,
  createReviewByRestId,
  updateReviewByRestId,
} = require('../controllers/reviewController');
const { protectMW } = require('../controllers/authController');

const router = express.Router();

router
  .route('/:id')
  .get(getReviewsByRestId)
  .post(protectMW, createReviewByRestId)
  .put(protectMW, updateReviewByRestId)
  .delete();

module.exports = router;
