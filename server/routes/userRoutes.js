const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/').get(getAllUsers);

// router.route('/:id').get().put().delete();

module.exports = router;
