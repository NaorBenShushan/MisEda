const Rest = require('../models/restModel');
const yup = require('yup');

async function validateRest(rest) {
  let restSchema = yup.object().shape({
    name: yup.string().required().trim().min(2).max(15),

    address: yup.object().shape({
      city: yup.string().required().trim().min(2).max(20),
      street: yup.string().required().trim().min(2).max(20),
      number: yup.number().required().min(1).max(200),
    }),

    phone: yup.string().required().trim().min(9).max(10),

    description: yup.string().required().trim().min(15).max(255),

    community: yup.string().required().trim().min(3).max(20),

    kosher: yup.boolean().required(),

    openingHours: yup.object().shape({
      sunday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),

      monday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),

      tuesday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),

      wednesday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),

      thursday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),

      friday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),
      saturday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25),
      }),
    }),

    menu: yup.string().required().trim().min(10).max(255).url(),

    website: yup.string().required().trim().min(10).max(255).url(),

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

  if (!rests || rests.length === 0) return res.status(404).send('לא נמצאו מסעדות');

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
    delete newRest.rating;
    delete newRest.createdAt;

    // restrict to rest owners only
    if (!req.user.restOwner) return res.status(401).send('אין לך הרשאות לבצע פעולה זו');

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

  if (!rest) return res.status(404).send('המסעדה המבוקשת לא נמצאה');

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
    delete body.rating;
    delete body.createdAt;

    // getting user id from protect MW
    const userId = req.user._id;

    // trying to update rest with given rest & user IDs
    const rest = await Rest.findOneAndUpdate({ _id: req.params.id, ownerId: userId }, body);

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send('המסעדה לא נמצאה');

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
      { active: false },
    );

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send('!!!המסעדה לא נמצאה');

    // everything is OK, send response
    res.status(200).send('המסעדה נמחקה בהצלחה');
  } catch (err) {
    res.status(400).send(err);
  }
};

/**************************************************
 ************** GET TOP 5 RESTAURANTS *************
 **************************************************/
