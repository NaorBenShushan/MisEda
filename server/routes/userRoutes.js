const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { register, login, protectMW } = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

// Protect all routes after this middleware
router.use(protectMW);

router.route('/').get(getAllUsers);

// router.route('/:id').get().put().delete();

module.exports = router;
