const Review = require('../models/reviewModel');
const Rest = require('../models/restModel');
const yup = require('yup');

// helps to check if given object ID is valid
var ObjectId = require('mongoose').Types.ObjectId;

const validateReview = async (review) => {
  let reviewSchema = yup.object().shape({
    title: yup.string().required().trim().min(3).max(25),

    content: yup.string().required().trim().min(3).max(255),

    rating: yup.number().required().min(0).max(5),
  });

  // check validity
  return reviewSchema.validate(review);
};

/**************************************************
 ************* GET REVIEWS BY REST ID *************
 **************************************************/
exports.getReviewsByRestId = async (req, res) => {
  try {
    const reviews = await Review.find({ restId: req.params.id });

    console.log(reviews);

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
    delete newReview.active;
    delete newReview.userId;
    delete newReview.restId;
    delete newReview.createdAt;

    // checking if rest id is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).send('אין מסעדה כזו');
    }

    // check if rest exists
    const rest = await Rest.findOne({ _id: req.params.id, active: true });

    if (!rest) return res.status(404).send('המסעדה המבוקשת לא נמצאה');

    // check if user already reviewed this rest ??
    // if so, need to add to review model an array of users who reviewed the rest,
    // and then check here if the ID exists there

    // restrict to **NOT** rest owners only
    if (req.user.restOwner) return res.status(401).send('אין לך הרשאות לבצע פעולה זו');

    // getting user + rest from protect MW and adding it to the review object
    newReview.userId = req.user._id;
    newReview.restId = req.params.id;

    // create new review
    await Review.create(newReview);

    // send response with new restaurant
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

/**************************************************
 *************** DELETE REVIEW BY ID **************
 **************************************************/
