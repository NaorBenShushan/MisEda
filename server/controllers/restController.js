const Rest = require('../models/restModel');
const yup = require('yup');

async function validateRest(rest) {
  let restSchema = yup.object().shape({
    name: yup.string().required().trim().min(2).max(15),

    address: yup.object().shape({
      city: yup.string().required().trim().min(2).max(20),
      street: yup.string().required().trim().min(2).max(20),
      number: yup.number().required().min(1).max(200)
    }),

    phone: yup.string().required().trim().min(9).max(10),

    description: yup.string().required().trim().min(15).max(255),

    community: yup.string().required().trim().min(3).max(20),

    kosher: yup.boolean().required(),

    openingHours: yup.object().shape({
      sunday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),

      monday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),

      tuesday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),

      wednesday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),

      thursday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),

      friday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      }),
      saturday: yup.object().shape({
        open: yup.number().required().min(0).max(25),
        close: yup.number().required().min(0).max(25)
      })
    }),

    menu: yup.string().required().trim().min(10).max(255).url(),

    website: yup.string().required().trim().min(10).max(255).url()

    // ADD LOGO VALIDATION (MULTER)
    // ADD GALLERY VALIDATION (MULTER)
  });

  // check validity
  const res = await restSchema.isValid(rest);
  console.log(res);
}

/**************************************************
 *************** GET ALL RESTAURANTS **************
 **************************************************/
exports.getAllRests = async (req, res) => {
  const rests = await Rest.find({ active: true });

  if (!rests) return res.status(404).send('לא נמצאו מסעדות');

  res.status(200).json({
    results: rests.length,
    data: rests
  });
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
 **************** CREATE RESTAURANT ***************
 **************************************************/
exports.createRest = async (req, res) => {
  // Validate!!!!!!!!!
  const valid = await validateRest(req.body);

  res.send('hello');
  //   try {
  //     const newDoc = await Rest.create(req.body);

  //     res.status(200).send(newDoc);
  //   } catch (err) {
  //     res.status(401).send(err);
  //   }
};

/**************************************************
 **************** UPDATE RESTAURANT ***************
 **************************************************/

/**************************************************
 **************** DELETE RESTAURANT ***************
 **************************************************/

/**************************************************
 ************** GET TOP 5 RESTAURANTS *************
 **************************************************/
