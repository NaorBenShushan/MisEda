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

    // ADD PROFILE PICTURE VALIDATION (MULTER)
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

/**************************************************
 **************** UPDATE USER BY ID ***************
 **************************************************/

/**************************************************
 **************** DELETE USER BY ID ***************
 **************************************************/
