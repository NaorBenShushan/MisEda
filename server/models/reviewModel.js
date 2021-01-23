const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
