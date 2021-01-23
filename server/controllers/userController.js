const User = require('../models/userModel');
const yup = require('yup');

exports.validateUserOnRegister = async (user) => {
  let userSchema = yup.object().shape({
    firstName: yup.string().required().trim().min(2).max(15),

    lastName: yup.string().required().trim().min(2).max(15),

    email: yup.string().required().trim().min(6).max(20).email().lowercase(),

    password: yup.string().required().min(8).max(20),

    restOwner: yup.boolean().required(),

    // ADD PROFILE PICTURE VALIDATION (MULTER)
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

exports.validateUserOnLogin = async (user) => {
  let userSchema = yup.object().shape({
    email: yup.string().required().trim().min(6).max(20).email().lowercase(),

    password: yup.string().required().min(8).max(20),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

/**************************************************
 ****************** GET ALL USERS *****************
 **************************************************/
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) return res.status(404).send('לא נמצאו משתמשים');

  res.status(200).json({
    results: users.length,
    data: users,
  });
};

/**************************************************
 ****************** GET USER BY ID ****************
 **************************************************/

/**************************************************
 **************** UPDATE USER BY ID ***************
 **************************************************/

/**************************************************
 **************** DELETE USER BY ID ***************
 **************************************************/
