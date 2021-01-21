const express = require('express');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post();

// router.route('/:id').get().put().delete();

module.exports = router;
