const express = require('express');
const {
  getAllRests,
  getRestById,
  createRest,
  updateRestById,
  deleteRestById,
} = require('../controllers/restController');
const { protectMW } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllRests).post(protectMW, createRest);

router
  .route('/:id')
  .get(getRestById)
  .put(protectMW, updateRestById)
  .delete(protectMW, deleteRestById);

module.exports = router;
