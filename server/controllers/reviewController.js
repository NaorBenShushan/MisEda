const Review = require('../models/reviewModel');
const Rest = require('../models/restModel');
const yup = require('yup');

// helps to check if given object ID is valid
var ObjectId = require('mongoose').Types.ObjectId;

const validateReview = async (review) => {
  let reviewSchema = yup.object().shape({
    title: yup
      .string()
      .required('יש להזין כותרת')
      .trim()
      .min(3, 'כותרת קצרה מדי')
      .max(25, 'כותרת ארוכה מדי'),

    content: yup
      .string()
      .required('יש להזין תוכן')
      .trim()
      .min(3, 'תוכן קצר מדי')
      .max(255, 'תוכן ארוך מדי'),

    rating: yup.number().required('יש להזין דירוג').min(1).max(5),
  });

  // check validity
  // abortEarly make validation for all fields and send all errors instead of one at a time
  return reviewSchema.validate(review, { abortEarly: false });
};

/**************************************************
 ************* GET REVIEWS BY REST ID *************
 **************************************************/
exports.getReviewsByRestId = async (req, res) => {
  try {
    const reviews = await Review.find({ restId: req.params.id }).populate('userId');

    if (!reviews || reviews.length === 0) return res.status(404).send('לא נמצאו ביקורות למסעדה זו');

    res.status(200).json({
      results: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(401).send('בלה בלה');
  }
};

/**************************************************
 ************ CREATE REVIEW BY REST ID ************
 **************************************************/
exports.createReviewByRestId = async (req, res) => {
  try {
    // Validate body
    let newReview = await validateReview(req.body);

    // clean body from sensitive values
    delete newReview._id;
    delete newReview.userId;
    delete newReview.restId;
    delete newReview.createdAt;

    // restrict to **NOT** rest owners only
    if (req.user.restOwner) return res.status(401).send('אין לך הרשאות לבצע פעולה זו');

    // checking if rest id is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).send('אין מסעדה כזו');
    }

    // check if rest exists
    const rest = await Rest.findOne({ _id: req.params.id, active: true });

    if (!rest) return res.status(404).send('המסעדה המבוקשת לא נמצאה');

    // check if user already reviewed this rest
    if (rest.usersReviewed.includes(req.user._id)) {
      return res.status(400).send('כבר ביקרת את המסעדה הזו בעבר');
    }

    // if user didn't review this rest yet, add his ID to the array
    rest.usersReviewed.push(req.user._id);
    await rest.save();

    // getting user + rest from protect MW and adding it to the review object
    newReview.userId = req.user._id;
    newReview.restId = req.params.id;

    // create new review
    await Review.create(newReview);

    // send response with new review
    res.status(201).send(newReview);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 **************** GET REVIEW BY ID ****************
 **************************************************/

/**************************************************
 *************** UPDATE REVIEW BY ID **************
 **************************************************/
exports.updateReviewByRestId = async (req, res) => {
  try {
    // Validate body
    let sentReview = await validateReview(req.body);

    // clean body from sensitive values
    delete sentReview._id;
    delete sentReview.userId;
    delete sentReview.restId;
    delete sentReview.createdAt;

    // restrict to **NOT** rest owners only
    if (req.user.restOwner) return res.status(401).send('אין לך הרשאות לבצע פעולה זו');

    // checking if rest id is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).send('אין מסעדה כזו');
    }

    // check if rest exists
    const rest = await Rest.findOne({ _id: req.params.id, active: true });

    if (!rest) return res.status(404).send('המסעדה המבוקשת לא נמצאה');

    // update review
    const reviewToUpdate = await Review.findOneAndUpdate(
      { restId: req.params.id, userId: req.user._id },
      sentReview,
    );

    if (!reviewToUpdate) return res.status(404).send('הביקורת לא נמצאה');

    const updatedReview = await Review.findOne({
      restId: req.params.id,
      userId: req.user._id,
    });

    // send response with new review
    res.status(200).send(updatedReview);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 *************** DELETE REVIEW BY ID **************
 **************************************************/
