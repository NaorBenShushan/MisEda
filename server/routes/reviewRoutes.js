const express = require('express');
const {
  getReviewsByRestId,
  createReviewByRestId,
  updateReviewByRestId,
  deleteReviewByRestId,
} = require('../controllers/reviewController');
const { protectMW } = require('../controllers/authController');

const router = express.Router();

router
  .route('/:id')
  .get(getReviewsByRestId)
  .post(protectMW, createReviewByRestId)
  .put(protectMW, updateReviewByRestId)
  .delete(protectMW, deleteReviewByRestId);

module.exports = router;
