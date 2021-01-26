const express = require('express');
const {
  getAllRests,
  getRestById,
  createRest,
  updateRestById,
  deleteRestById,
} = require('../controllers/restController');
const { protectMW } = require('../controllers/authController');

// multer - logo
const multer = require('multer');
var path = require('path');

const date = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // callback(null, `./uploads/${req.body.name}`);
    callback(null, `./uploads/`);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      `${req.body.name}-${file.fieldname}-${date}-${path.basename(file.originalname)}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpe' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jfif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

// router
const router = express.Router();

router
  .route('/')
  .get(getAllRests)
  .post(
    protectMW,

    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),

    createRest,
  );

router
  .route('/:id')
  .get(getRestById)
  .put(
    protectMW,

    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),

    updateRestById,
  )
  .delete(protectMW, deleteRestById);

//   router
//   .route('/:slug')
//   .get(getRestBySlug)

module.exports = router;
