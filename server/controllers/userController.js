const User = require("../models/userModel");
const yup = require("yup");

exports.validateUserOnRegister = async (user) => {
  let userSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("יש לציין שם פרטי")
      .trim()
      .min(2, "שם פרטי קצר מדי")
      .max(15, "שם פרטי ארוך מדי"),

    lastName: yup
      .string()
      .required("יש לציין שם משפחה")
      .trim()
      .min(2, "שם המשפחה קצר מדי")
      .max(15, "שם המשפחה ארוך מדי"),

    email: yup
      .string()
      .required("יש לציין אימייל")
      .trim()
      .min(6, "האימייל קצר מדי")
      .max(20, "האימייל ארוך מדי")
      .email()
      .lowercase(),

    password: yup
      .string()
      .required("יש לציין סיסמה")
      .min(8, "הסיסמה קצרה מדי")
      .max(20, "הסיסמה ארוכה מדי"),

    restOwner: yup.boolean().required("יש לציין האם את/ה בעל/ת מסעדה"),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

exports.validateUserOnLogin = async (user) => {
  let userSchema = yup.object().shape({
    email: yup
      .string()
      .required("יש לציין אימייל")
      .trim()
      .min(6, "האימייל קצר מדי")
      .max(20, "האימייל ארוך מדי")
      .email()
      .lowercase(),

    password: yup
      .string()
      .required("יש לציין סיסמה")
      .min(8, "הסיסמה קצרה מדי")
      .max(20, "הסיסמה ארוכה מדי"),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return userSchema.validate(user, { abortEarly: false });
};

exports.validateUserOnUpdate = async (user) => {
  let userSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("יש לציין שם פרטי")
      .trim()
      .min(2, "שם פרטי קצר מדי")
      .max(15, "שם פרטי ארוך מדי"),

    lastName: yup
      .string()
      .required("יש לציין שם משפחה")
      .trim()
      .min(2, "שם המשפחה קצר מדי")
      .max(15, "שם המשפחה ארוך מדי"),

    email: yup
      .string()
      .required("יש לציין אימייל")
      .trim()
      .min(6, "האימייל קצר מדי")
      .max(20, "האימייל ארוך מדי")
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
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).send("משהו השתבש. אנא התחבר מחדש.");

    // creating userToUpdate object from the body
    let userToUpdate = req.body;

    console.log(userToUpdate);
    // adding profile picture to the object only if user sent one
    // if (req.file) userToUpdate.profilePicture = req.file.path;

    // Validate body
    await validateUserOnUpdate(userToUpdate);

    // create document
    await User.findOneAndUpdate(userToUpdate);

    // send response
    res.status(201).send(userToUpdate);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 ********** UPDATE USER ** PHOTOS ** BY ID ********
 **************************************************/
exports.updateUserPhotosById = async (req, res) => {
  try {
    if (!req.files.gallery)
      return res.status(400).send("נא להעלות תמונות לעדכון");

    // create gallery paths array
    let galleryPaths = req.files.gallery.map((gal) => gal.path);

    // getting user id from protect MW
    const userId = req.user._id;

    // trying to update rest with given rest & user IDs
    const user = await User.findOne({ _id: req.params.id, ownerId: userId });

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!user) return res.status(404).send("המסעדה לא נמצאה");

    // update the photos paths to the current photos uploaded
    rest.gallery = galleryPaths;

    await user.save();

    const updatedRest = await User.findById(req.params.id);

    // everything is OK, send response
    res.status(200).send(updatedRest);
  } catch (err) {
    res.status(400).send(err);
  }
};

/* &&&&&&&&&&&&&&&&&&& ADMIN FUNCTION  &&&&&&&&&&&&&&&&&&& */

/**************************************************
 ****************** GET ALL USERS *****************
 **************************************************/
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0)
    return res.status(404).send("לא נמצאו משתמשים");

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

  if (!user) return res.status(404).send("המשתמש לא נמצא");

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
  if (user.active === false) return res.status(400).send("המשתמש נמחק כבר");

  if (!user) return res.status(404).send("המשתמש לא נמצא");

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
  if (user.active === true) return res.status(400).send("המשתמש אוקטב כבר");

  if (!user) return res.status(404).send("המשתמש לא נמצא");

  res.status(200).send(user);
};
