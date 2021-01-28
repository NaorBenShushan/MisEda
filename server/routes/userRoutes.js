const express = require('express');
const {
  updateUserById,
  getAllUsers,
  getUserById,
  deactivateUserById,
  reactivateUserById,
} = require('../controllers/userController');
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

router.route('/my-account').patch(protectMW, updateUserById);
router.route('/register').post(upload.single('profilePicture'), register);
router.route('/login').post(login);

router.route('/users').get(protectMW, restrict, getAllUsers);
router
  .route('/users/:id')
  .get(protectMW, restrict, getUserById)
  .put(protectMW, restrict, reactivateUserById)
  .delete(protectMW, restrict, deactivateUserById);

module.exports = router;
