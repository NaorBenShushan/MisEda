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
  return restSchema.validate(rest);
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
    await validateRest(req.body);

    const newDoc = await Rest.create(req.body);

    res.status(201).send(newDoc);
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
    await validateRest(req.body);

    // const user = req.user._id;
    await Rest.findByIdAndUpdate(
      {
        _id: req.params.id,
        // ownerId: user
      },
      req.body,
    );

    const updatedRest = await Rest.findById({
      _id: req.params.id,
      // ownerId: user
    });

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
    // const user = req.user._id;
    const rest = await Rest.findByIdAndRemove({
      _id: req.params.id,
      // ownerId: user
    });

    if (!rest) return res.status(404).send('The rest with the given ID was not found.');

    res.status(204).send('המסעדה נמחקה בהצלחה');
  } catch (err) {
    res.status(404).send('המסעדה לא נמצאה');
  }
};

/**************************************************
 ************** GET TOP 5 RESTAURANTS *************
 **************************************************/
