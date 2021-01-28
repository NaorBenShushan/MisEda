const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'ציין שם פרטי'],
    trim: true,
    minlength: [2, 'שם פרטי לא תקין'],
    maxlength: [15, 'שם פרטי לא תקין'],
  },

  lastName: {
    type: String,
    required: [true, 'ציין שם משפחה'],
    trim: true,
    minlength: [2, 'שם פרטי לא תקין'],
    maxlength: [15, 'שם פרטי לא תקין'],
  },

  email: {
    type: String,
    required: [true, 'ציין אימייל'],
    trim: true,
    minlength: [6, 'אימייל לא תקין'],
    maxlength: [25, 'אימייל לא תקין'],
    lowercase: true,
    unique: [true, 'אימייל קיים במערכת'],
  },

  password: {
    type: String,
    required: [true, 'ציין סיסמא'],
    minlength: [8, 'סיסמא קצרה מידי'],
    maxlength: [1000, 'סיסמא ארוכה מידי'],
    select: false,
  },

  // Will be changed later
  profilePicture: {
    type: String,
    minlength: 4,
    maxlength: 50,
    // default: 'uploads/user.png',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  restOwner: {
    type: Boolean,
    required: [true, 'ציין האם אתה בעל מסעדה'],
  },

  active: {
    type: Boolean,
    default: true,
  },

  q1w2e3r4: {
    type: String,
  },

  // Array of restaurants
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }],
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, restOwner: this.restOwner }, process.env.JWTKEY);

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
