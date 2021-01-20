const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "שם המסעדה לא תקין"],
    maxlength: [15, "שם המסעדה לא תקין"],
    required: [true, "ציין את שם המסעדה"],
    trim: true,
  },

  address: {
    city: {
      type: String,
      minlength: [2, "שם העיר לא תקין"],
      maxlength: [30, "שם העיר לא תקין"],
      required: [true, "ציין את שם העיר"],
      trim: true,
    },

    street: {
      type: String,
      minlength: [2, "שם הרחוב לא תקין"],
      maxlength: [30, "שם הרחוב לא תקין"],
      required: [true, "ציין את שם הרחוב"],
      trim: true,
    },

    number: {
      type: Number,
      minlength: [1, "מספר לא תקין"],
      maxlength: [4, "מספר לא תקין"],
      required: [true, "ציין את המספר"],
    },
  },

  phone: {
    type: String,
    minlength: [7, "מספר הטלפון לא תקין"],
    maxlength: [20, "מספר הטלפון לא תקין"],
    required: [true, "ציין את הטלפון בבית העסק"],
    trim: true,
  },

  description: {
    type: String,
    minlength: [15, "תיאור העסק קצר מדי"],
    maxlength: [255, "תיאור העסק ארוך מדי"],
    required: [true, "תאר את העסק"],
    trim: true,
  },

  community: {
    type: String,
    minlength: [15, "תיאור העסק קצר מדי"],
    maxlength: [20, "תיאור העסק ארוך מדי"],
    required: [true, "ציין את עדת העסק"],
    trim: true,
  },

  kosher: {
    type: Boolean,
    required: [true, "ציין את כשרות העסק"],
  },

  openingHours: {
    sunday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },

      required: [true, "ציין את שעות הפעילות"],
    },
    monday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
    tuesday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
    wednesday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
    thursday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
    friday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
    saturday: {
      open: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      close: {
        type: Number,
        maxlength: [4, "הזמן לא תקין"],
      },
      required: [true, "ציין את שעות הפעילות"],
    },
  },

  menu: {
    type: String,
    minlength: [4, "הקישור לא תקין"],
    maxlength: [150, "הקישור לא תקין"],
    required: [true, "הזמן קישור לתפריט"],
    trim: true,
  },

  website: {
    type: String,
    minlength: [7, "כתובת האתר לא תקינה"],
    maxlength: [150, "כתובת האתר לא תקינה"],
    required: [true, "הזמן קישור לאתר המסעדה"],
    trim: true,
  },

  // Will be changed later (multer)
  logo: {
    type: String,
    minlength: 8,
    maxlength: 15,
    default: "user.jpeg",
    required: [true, "הזמן קישור ללוגו המסעדה"],
    trim: true,
  },

  gallery: [
    { type: String, minlength: 8, maxlength: 15, default: "user.jpeg" },
  ],

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Rest = mongoose.model("Rest", restSchema);

module.exports = Rest;
