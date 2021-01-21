const express = require('express');
const {
  getAllRests,
  getRestById,
  createRest,
  updateRestById,
  deleteRestById
} = require('../controllers/restController');

const router = express.Router();

router.route('/').get(getAllRests).post(createRest);

router.route('/:id').get(getRestById).put(updateRestById).delete(deleteRestById);

module.exports = router;
