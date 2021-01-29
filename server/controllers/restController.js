const Rest = require('../models/restModel');
const yup = require('yup');
const fs = require('fs');
const path = require('path');

async function validateRest(rest) {
  let restSchema = yup.object().shape({
    name: yup.string().required('יש להזין שם').trim().min(2, 'שם קצר מדי').max(15, 'שם ארוך מדי'),

    address: yup.object().shape({
      city: yup
        .string()
        .required('יש להזין את שם העיר')
        .trim()
        .min(2, 'שם העיר קצר מדי')
        .max(20, 'שם העיר ארוך מדי'),
      street: yup
        .string()
        .required()
        .trim()
        .min(2, 'שם הרחוב קצר מדי')
        .max(20, 'שם הרחוב ארוך מדי'),
      number: yup.number().required().min(1, "מס' הרחוב קצר מדי").max(1000, "מס' הרחוב ארוך מדי"),
    }),

    phone: yup
      .string()
      .required('יש להזין מספר טלפון')
      .trim()
      .min(9, "מס' הטלפון קצר מדי")
      .max(10, "מס' הטלפון ארוך מדי"),

    description: yup
      .string()
      .required('יש להזין תיאור למסעדה')
      .trim()
      .min(15, 'תיאור קצר מידי')
      .max(255, 'תיאור ארוך מידי'),

    community: yup
      .string()
      .required('יש להזין עדה')
      .trim()
      .min(3, 'שם העדה קצר מדי')
      .max(20, 'שם העדה ארוך מדי'),

    kosher: yup.boolean().required('יש להזין מצב כשרות'),

    openingHours: yup.object().shape({
      sunday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      monday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      tuesday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      wednesday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      thursday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      friday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),

      saturday: yup.object().shape({
        open: yup
          .number()
          .required('יש לציין שעות פתיחה')
          .min(0, 'שעת הפתיחה קצרה מדי')
          .max(25, 'שעת הפתיחה ארוכה מדי'),
        close: yup
          .number()
          .required('יש לציין שעות סגירה')
          .min(0, 'שעת הסגירה קצרה מדי')
          .max(25, 'שעת הסגירה ארוכה מדי'),
      }),
    }),

    menu: yup
      .string()
      .required('יש לצרף קישור לתפריט')
      .trim()
      .min(7, 'הקישור לתפריט קצר מדי')
      .max(255, 'הקישור לתפריט ארוך מדי')
      .url(),

    website: yup
      .string()
      .required('יש לצרף קישור לאתר המסעדה')
      .trim()
      .min(7, 'הקישור לאתר קצר מדי')
      .max(255, 'הקישור לאתר ארוך מדי')
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
  let rests;

  if (req.query) {
    rests = await Rest.find().sort('-ratingsAverage').limit(5);
  } else {
    rests = await Rest.find();
  }

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
    // create gallery paths array
    let galleryPaths = req.files.gallery.map((gal) => gal.path);

    // create object to create - therefore no need to clean
    let newRest = {
      name: req.body.name,
      address: {
        city: req.body.addressCity,
        street: req.body.addressStreet,
        number: req.body.addressNumber,
      },
      phone: req.body.phone,
      description: req.body.description,
      community: req.body.community,
      kosher: req.body.kosher,
      openingHours: {
        sunday: {
          open: req.body.ohSundayOpen,
          close: req.body.ohSundayClose,
        },
        monday: {
          open: req.body.ohMondayOpen,
          close: req.body.ohMondayClose,
        },
        tuesday: {
          open: req.body.ohTuesdayOpen,
          close: req.body.ohTuesdayClose,
        },
        wednesday: {
          open: req.body.ohWednesdayOpen,
          close: req.body.ohWednesdayClose,
        },
        thursday: {
          open: req.body.ohThursdayOpen,
          close: req.body.ohThursdayClose,
        },
        friday: {
          open: req.body.ohFridayOpen,
          close: req.body.ohFridayClose,
        },
        saturday: {
          open: req.body.ohSaturdayOpen,
          close: req.body.ohSaturdayClose,
        },
      },
      menu: req.body.menu,
      website: req.body.website,
      logo: req.files.logo[0].path,
      gallery: galleryPaths,
    };

    // validate body
    await validateRest(newRest);

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
    // create object to create - therefore no need to clean
    const body = {
      name: req.body.name,
      address: {
        city: req.body.addressCity,
        street: req.body.addressStreet,
        number: req.body.addressNumber,
      },
      phone: req.body.phone,
      description: req.body.description,
      community: req.body.community,
      kosher: req.body.kosher,
      openingHours: {
        sunday: {
          open: req.body.ohSundayOpen,
          close: req.body.ohSundayClose,
        },
        monday: {
          open: req.body.ohMondayOpen,
          close: req.body.ohMondayClose,
        },
        tuesday: {
          open: req.body.ohTuesdayOpen,
          close: req.body.ohTuesdayClose,
        },
        wednesday: {
          open: req.body.ohWednesdayOpen,
          close: req.body.ohWednesdayClose,
        },
        thursday: {
          open: req.body.ohThursdayOpen,
          close: req.body.ohThursdayClose,
        },
        friday: {
          open: req.body.ohFridayOpen,
          close: req.body.ohFridayClose,
        },
        saturday: {
          open: req.body.ohSaturdayOpen,
          close: req.body.ohSaturdayClose,
        },
      },
      menu: req.body.menu,
      website: req.body.website,
    };

    // Validate body
    await validateRest(body);

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
    res.status(400).send(err);
  }
};

/**************************************************
 ****** UPDATE RESTAURANT ** PHOTOS ** BY ID ******
 **************************************************/
exports.updateRestPhotosById = async (req, res) => {
  try {
    if (!req.files.gallery || !req.files.logo)
      return res.status(400).send('נא להעלות לוגו ותמונות');

    // create gallery paths array
    let galleryPaths = req.files.gallery.map((gal) => gal.path);

    // getting user id from protect MW
    const userId = req.user._id;

    // trying to update rest with given rest & user IDs
    const rest = await Rest.findOne({ _id: req.params.id, ownerId: userId });

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send('המסעדה לא נמצאה');

    // get rest's old photos path and delete it from './uploads/' folder
    if (rest.logo && rest.gallery) {
      let oldLogo = rest.logo;
      let oldGallery = [...rest.gallery];

      // delete with fs
      fs.unlink(path.normalize(oldLogo), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      oldGallery.forEach((photo) => {
        fs.unlink(path.normalize(photo), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
    }

    // update the photos paths to the current photos uploaded
    rest.logo = req.files.logo[0].path;
    rest.gallery = galleryPaths;

    await rest.save();

    const updatedRest = await Rest.findById(req.params.id);

    // everything is OK, send response
    res.status(200).send(updatedRest);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**************************************************
 ************* DELETE RESTAURANT BY ID ************
 **************************************************/
exports.deactivateRestById = async (req, res) => {
  try {
    // getting user id from protect MW
    const user = req.user._id;

    // trying to update 'active' field with given rest & user IDs
    const rest = await Rest.findOneAndUpdate(
      { _id: req.params.id, ownerId: user },
      { active: false },
    );

    // if this rest is already deleted => send error
    if (rest.active === false) return res.status(400).send('המסעדה נמחקה כבר');

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
 *********** REACTIVATE RESTAURANT BY ID **********
 **************************************************/
exports.reactivateRestById = async (req, res) => {
  try {
    // getting user id from protect MW
    const user = req.user._id;

    // trying to update 'active' field rest with given rest & user IDs
    const rest = await Rest.findOneAndUpdate(
      { _id: req.params.id, ownerId: user },
      { active: true },
    );

    // if this rest is already deleted => send error
    if (rest.active === true) return res.status(400).send('המסעדה אוקטבה כבר');

    // if failed:
    // 1. not the same owner
    // 2. rest does not exist
    if (!rest) return res.status(404).send('!!!המסעדה לא נמצאה');

    // everything is OK, send response
    res.status(200).send('המסעדה אוקטבה בהצלחה');
  } catch (err) {
    res.status(400).send(err);
  }
};

/**************************************************
 *********** GET TOP 5 RESTAURANTS - MW ***********
 **************************************************/
exports.topFiveRests = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'ratingsAverage';

  next();
};
