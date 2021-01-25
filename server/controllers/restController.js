const Rest = require("../models/restModel");
const yup = require("yup");

async function validateRest(rest) {
  let restSchema = yup.object().shape({
    name: yup
      .string()
      .required("יש להזין שם")
      .trim()
      .min(2, "שם קצר מדי")
      .max(15, "שם ארוך מדי"),

    address: yup.object().shape({
      city: yup
        .string()
        .required("יש להזין את שם העיר")
        .trim()
        .min(2, "שם העיר קצר מדי")
        .max(20, "שם העיר ארוך מדי"),
      street: yup
        .string()
        .required()
        .trim()
        .min(2, "שם הרחוב קצר מדי")
        .max(20, "שם הרחוב ארוך מדי"),
      number: yup
        .number()
        .required()
        .min(1, "מס' הרחוב קצר מדי")
        .max(5, "מספר הרחוב ארוך מדי"),
    }),

    phone: yup
      .string()
      .required("יש להזין מספר טלפון")
      .trim()
      .min(9, "מס' הטלפון קצר מדי")
      .max(10, "מס' הטלפון ארוך מדי"),

    description: yup
      .string()
      .required("יש להזין תיאור למסעדה")
      .trim()
      .min(15, "")
      .max(255),

    community: yup
      .string()
      .required("יש להזין עדה")
      .trim()
      .min(3, "שם העדה קצר מדי")
      .max(20, "שם העדה ארוך מדי"),

    kosher: yup.boolean().required("יש להזין מצב כשרות"),

    openingHours: yup.object().shape({
      sunday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      monday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      tuesday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      wednesday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      thursday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      friday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),

      saturday: yup.object().shape({
        open: yup
          .number()
          .required("יש לציין שעות פתיחה")
          .min(0, "שעת הפתיחה קצרה מדי")
          .max(25, "שעת הפתיחה ארוכה מדי"),
        close: yup
          .number()
          .required("יש לציין שעות סגירה")
          .min(0, "שעת הסגירה קצרה מדי")
          .max(25, "שעת הסגירה ארוכה מדי"),
      }),
    }),

    menu: yup
      .string()
      .required("יש לצרף קישור לתפריט")
      .trim()
      .min(7, "הקישור לתפריט קצר מדי")
      .max(255, "הקישור לתפריט ארוך מדי")
      .url(),

    website: yup
      .string()
      .required("יש לצרף קישור לאתר המסעדה")
      .trim()
      .min(7, "הקישור לאתר קצר מדי")
      .max(255, "הקישור לאתר ארוך מדי")
      .url(),

    // ADD LOGO VALIDATION (MULTER)
    // ADD GALLERY VALIDATION (MULTER)
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return restSchema.validate(rest, { abortEarly: false });
}

/**************************************************
 *************** GET ALL RESTAURANTS **************
 **************************************************/
exports.getAllRests = async (req, res) => {
  const rests = await Rest.find();

  if (!rests || rests.length === 0)
    return res.status(404).send("לא נמצאו מסעדות");

  res.status(200).json({
    results: rests.length,
    data: rests,
  });
};

/**************************************************
 **************** CREATE RESTAURANT ***************
 **************************************************/
exports.createRest = async (req, res) => {
  try {
    // Validate body
    let newRest = await validateRest(req.body);

    // clean body from sensitive values
    delete newRest._id;
    delete newRest.active;
    delete newRest.ownerId;
    delete newRest.ratingsAverage;
    delete newRest.createdAt;
    delete newRest.usersReviewed;
    delete newRest.ratingsQuantity;

    // restrict to rest owners only
    if (!req.user.restOwner)
      return res.status(401).send("אין לך הרשאות לבצע פעולה זו");

    // getting user from protect MW and adding it to the rest object
    newRest.ownerId = req.user._id;

    // creating new restaurant
    await Rest.create(newRest);

    // send response with new restaurant
    res.status(201).send(newRest);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 *************** GET RESTAURANT BY ID *************
 **************************************************/
exports.getRestById = async (req, res) => {
  const restId = req.params.id;
  const rest = await Rest.findOne({ _id: restId, active: true });

  if (!rest) return res.status(404).send("המסעדה המבוקשת לא נמצאה");

  res.status(200).send(rest);
};

/**************************************************
 ************* UPDATE RESTAURANT BY ID ************
 **************************************************/
exports.updateRestById = async (req, res) => {
  try {
    // Validate body
    const body = await validateRest(req.body);

    // clean body from sensitive values
    delete body._id;
    delete body.active;
    delete body.ownerId;
    delete body.ratingsAverage;
    delete body.createdAt;
    delete body.usersReviewed;
    delete body.ratingsQuantity;

    // getting user id from protect MW
    const userId = req.user._id;

    // trying to update rest with given rest & user IDs
    const rest = await Rest.findOneAndUpdate(
      { _id: req.params.id, ownerId: userId },
      body
    );

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send("המסעדה לא נמצאה");

    const updatedRest = await Rest.findById(req.params.id);

    // everything is OK, send response
    res.status(200).send(updatedRest);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 ************* DELETE RESTAURANT BY ID ************
 **************************************************/
exports.deleteRestById = async (req, res) => {
  try {
    // getting user id from protect MW
    const user = req.user._id;

    // trying to update 'active' field rest with given rest & user IDs
    const rest = await Rest.findOneAndUpdate(
      { _id: req.params.id, ownerId: user },
      { active: false }
    );

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send("!!!המסעדה לא נמצאה");

    // everything is OK, send response
    res.status(200).send("המסעדה נמחקה בהצלחה");
  } catch (err) {
    res.status(400).send(err);
  }
};

/**************************************************
 ************** GET TOP 5 RESTAURANTS *************
 **************************************************/
