const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { register, login, protectMW, restrict } = require('../controllers/authController');

/********** multer **********/
const multer = require('multer');
var path = require('path');

const date = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./uploads/`);
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${date}-${path.basename(file.originalname)}`);
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

router.route('/register').post(upload.single('profilePicture'), register);
router.route('/login').post(login);

// Protect all routes after this middleware
router.use(protectMW, restrict);

router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getUserById);

module.exports = router;
