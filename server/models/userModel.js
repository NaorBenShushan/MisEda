const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: [2, "שם פרטי לא תקין"],
    maxlength: [15, "שם פרטי לא תקין"],
    required: [true, "ציין שם פרטי"],
  },

  lastName: {
    type: String,
    minlength: [2, "שם פרטי לא תקין"],
    maxlength: [15, "שם פרטי לא תקין"],
    required: [true, "ציין שם משפחה"],
  },

  email: {
    type: String,
    minlength: [6, "אימייל לא תקין"],
    maxlength: [20, "אימייל לא תקין"],
    required: [true, "ציין אימייל"],
    unique: [true, "אימייל קיים במערכת"],
  },

  password: {
    type: String,
    minlength: [8, "סיסמא קצרה מידי"],
    maxlength: [15, "סיסמא ארוכה מידי"],
    required: [true, "ציין סיסמא"],
  },

  passwordConfirm: {
    type: String,
    minlength: [8, "סיסמא קצרה מידי"],
    maxlength: [15, "סיסמא ארוכה מידי"],
    required: [true, "ציין סיסמא שנית"],
  },

  // Will be changed later
  profilePicture: {
    type: String,
    minlength: 8,
    maxlength: 15,
    default: "user.jpeg",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  restOwner: {
    type: Boolean,
    required: [true, "אנא ציין האם אתה בעל מסעדה"],
  },

  // Array of restaurants
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
