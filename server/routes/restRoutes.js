const express = require('express');
const {
  getAllRests,
  getRestById,
  createRest,
  updateRestById,
  updateRestPhotosById,
  deactivateRestById,
  reactivateRestById,
  topFiveRests,
  restrictToRestOwnerMW,
} = require('../controllers/restController');
const { protectMW } = require('../controllers/authController');

/********** multer **********/
const multer = require('multer');
var path = require('path');

// const date = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./uploads/`);
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}-${path.basename(file.originalname)}`);
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

/********** router **********/
const router = express.Router();

// top 5 rests
router.route('/top-5-rests').get(topFiveRests, getAllRests);

router
  .route('/')
  .get(getAllRests)
  .post(
    protectMW,
    restrictToRestOwnerMW,

    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),

    createRest,
  );

router
  .route('/:id')
  .get(getRestById)
  .put(protectMW, restrictToRestOwnerMW, updateRestById)
  // update photos only
  .patch(
    protectMW,

    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'gallery', maxCount: 10 },
    ]),

    updateRestPhotosById,
  )
  .delete(protectMW, restrictToRestOwnerMW, deactivateRestById);

// restore Restaurant
router.route('/reactivate/:id').put(protectMW, restrictToRestOwnerMW, reactivateRestById);

//   router
//   .route('/:slug')
//   .get(getRestBySlug)

module.exports = router;
