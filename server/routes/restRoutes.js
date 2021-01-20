const express = require('express');
const { getAllRests, getRestById, createRest } = require('../controllers/restController');

const router = express.Router();

router.route('/').get(getAllRests).post(createRest);

router.route('/:id').get(getRestById);

module.exports = router;
