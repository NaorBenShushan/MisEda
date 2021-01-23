const express = require('express');
const { getReviewsByRestId, createReviewByRestId } = require('../controllers/reviewController');
const { protectMW } = require('../controllers/authController');

const router = express.Router();

// router.route('/').get();

router.route('/:id').get(getReviewsByRestId).post(protectMW, createReviewByRestId).put().delete();

module.exports = router;
