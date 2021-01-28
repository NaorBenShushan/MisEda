const User = require('../models/userModel');
const yup = require('yup');

exports.validateUserOnRegister = async (user) => {
  let userSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('יש לציין שם פרטי')
      .trim()
      .min(2, 'שם פרטי קצר מדי')
      .max(15, 'שם פרטי ארוך מדי'),

    lastName: yup
      .string()
      .required('יש לציין שם משפחה')
      .trim()
      .min(2, 'שם המשפחה קצר מדי')
      .max(15, 'שם המשפחה ארוך מדי'),

    email: yup
      .string()
      .required('יש לציין אימייל')
      .trim()
      .min(6, 'האימייל קצר מדי')
      .max(20, 'האימייל ארוך מדי')
      .email()
      .lowercase(),

    password: yup
      .string()
      .required('יש לציין סיסמה')
      .min(8, 'הסיסמה קצרה מדי')
      .max(20, 'הסיסמה ארוכה מדי'),

    restOwner: yup.boolean().required('יש לציין האם את/ה בעל/ת מסעדה'),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

exports.validateUserOnLogin = async (user) => {
  let userSchema = yup.object().shape({
    email: yup
      .string()
      .required('יש לציין אימייל')
      .trim()
      .min(6, 'האימייל קצר מדי')
      .max(20, 'האימייל ארוך מדי')
      .email()
      .lowercase(),

    password: yup
      .string()
      .required('יש לציין סיסמה')
      .min(8, 'הסיסמה קצרה מדי')
      .max(20, 'הסיסמה ארוכה מדי'),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

const validateUserOnUpdate = async (user) => {
  let userSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('יש לציין שם פרטי')
      .trim()
      .min(2, 'שם פרטי קצר מדי')
      .max(15, 'שם פרטי ארוך מדי'),

    lastName: yup
      .string()
      .required('יש לציין שם משפחה')
      .trim()
      .min(2, 'שם המשפחה קצר מדי')
      .max(15, 'שם המשפחה ארוך מדי'),

    email: yup
      .string()
      .required('יש לציין אימייל')
      .trim()
      .min(6, 'האימייל קצר מדי')
      .max(25, 'האימייל ארוך מדי')
      .email()
      .lowercase(),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

/* &&&&&&&&&&&&&&&&&&& USERS FUNCTIONS  &&&&&&&&&&&&&&&&&&& */

/**************************************************
 **************** UPDATE USER BY ID ***************
 **************************************************/
exports.updateUserById = async (req, res) => {
  try {
    // getting user ID from protect MW
    const userId = req.user._id;

    // creating body object
    let body = req.body;

    // check if there is another user with this email
    const emailCheck = await User.findOne({ email: body.email });

    console.log(userId);

    if (emailCheck) {
      console.log(emailCheck._id);

      if (emailCheck._id !== userId) {
        return res.status(400).send('כבר קיים משתמש עם האימייל הזה במערכת');
      }
    }

    // checking if the user still exists
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send('משהו השתבש. אנא התחבר מחדש.');

    // Validate body
    await validateUserOnUpdate(body);

    // update document
    await User.findOneAndUpdate({ _id: userId }, body);

    // getting the updated user
    const updatedUser = await User.findOne({ _id: userId });

    // sending updated user to the client
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**************************************************
 ********** UPDATE USER ** PHOTOS ** BY ID ********
 **************************************************/
exports.updateUserPhotosById = async (req, res) => {
  try {
    // if no file has been recieved, send error
    if (!req.file.path) return res.status(400).send('נא להעלות תמונה לעדכון');

    // getting user id from protect MW
    const userId = req.user._id;

    // check if user still exists
    const user = await User.findOne({ _id: userId });

    // if no user has been found, send error
    if (!user) return res.status(404).send('המשתמש לא נמצא');

    // update user with the new profile picture
    await User.findOneAndUpdate({ _id: userId }, { profilePicture: req.file.path });

    // getting updated user
    const updatedUser = await User.findById(req.user._id);

    // sending updated user to the client
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

/* &&&&&&&&&&&&&&&&&&& ADMIN FUNCTION  &&&&&&&&&&&&&&&&&&& */

/**************************************************
 ***************** GET ALL USERS ******************
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
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });

  if (!user) return res.status(404).send('המשתמש לא נמצא');

  res.status(200).send(user);
};

/**************************************************
 ************** DEACTIVATE USER BY ID *************
 **************************************************/
exports.deactivateUserById = async (req, res) => {
  // getting user id from req.params
  const userId = req.params.id;

  // trying to update 'active' field with given user ID
  const user = await User.findOneAndUpdate({ _id: userId }, { active: false });

  // if this rest is already deleted => send error
  if (user.active === false) return res.status(400).send('המשתמש נמחק כבר');

  if (!user) return res.status(404).send('המשתמש לא נמצא');

  res.status(200).send(user);
};

/**************************************************
 ************** REACTIVATE USER BY ID *************
 **************************************************/
exports.reactivateUserById = async (req, res) => {
  // getting user id from req.params
  const userId = req.params.id;

  // trying to update 'active' field with given user ID
  const user = await User.findOneAndUpdate({ _id: userId }, { active: true });

  // if this rest is already deleted => send error
  if (user.active === true) return res.status(400).send('המשתמש אוקטב כבר');

  if (!user) return res.status(404).send('המשתמש לא נמצא');

  res.status(200).send(user);
};
