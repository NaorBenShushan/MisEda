const mongoose = require('mongoose');
const Rest = require('../models/restModel');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'נא להזין כותרת'],
    trim: true,
    minlength: [3, 'כותרת לא תקינה'],
    maxlength: [25, 'כותרת לא תקינה'],
  },

  content: {
    type: String,
    required: [true, 'נא להזין תוכן לסקירה'],
    trim: true,
    minlength: [3, 'תוכן לא תקין'],
    maxlength: [255, 'תוכן לא תקין'],
  },

  rating: {
    type: Number,
    required: [true, 'סקירה חייבת לכלול דירוג'],
    min: 1,
    max: 5,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },

  restId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Rest',
    required: [true, 'Review must belong to a tour'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewSchema.statics.calculateAverageRatings = async function (restId) {
  const stats = await this.aggregate([
    { $match: { restId } },
    { $group: { _id: '$restId', nRating: { $sum: 1 }, avgRating: { $avg: '$rating' } } },
  ]);

  if (stats.length) {
    await Rest.findByIdAndUpdate(restId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Rest.findByIdAndUpdate(restId, {
      ratingsQuantity: 0,
      ratingsAverage: 1,
    });
  }
};

// calculate ratingsAverage & ratingsQuantity after creating a new review
reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calculateAverageRatings(this.restId);
});

// calculate ratingsAverage & ratingsQuantity after updating & deleting a review (2 functions below!)
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAverageRatings(this.r.restId);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
