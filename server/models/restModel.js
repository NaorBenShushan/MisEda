const mongoose = require('mongoose');

const restSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'ציין את שם המסעדה'],
    trim: true,
    minlength: [2, 'שם המסעדה לא תקין'],
    maxlength: [15, 'שם המסעדה לא תקין']
  },

  address: {
    city: {
      type: String,
      required: [true, 'ציין את שם העיר'],
      trim: true,
      minlength: [2, 'שם העיר לא תקין'],
      maxlength: [20, 'שם העיר לא תקין']
    },

    street: {
      type: String,
      required: [true, 'ציין את שם הרחוב'],
      trim: true,
      minlength: [2, 'שם הרחוב לא תקין'],
      maxlength: [20, 'שם הרחוב לא תקין']
    },

    number: {
      type: Number,
      required: [true, 'ציין את המספר'],
      minlength: [1, 'מספר לא תקין'],
      maxlength: [4, 'מספר לא תקין']
    }
  },

  phone: {
    type: String,
    required: [true, 'ציין את הטלפון בבית העסק'],
    trim: true,
    minlength: [9, 'מספר הטלפון לא תקין'],
    maxlength: [10, 'מספר הטלפון לא תקין']
  },

  description: {
    type: String,
    required: [true, 'תאר את העסק'],
    trim: true,
    minlength: [15, 'תיאור העסק קצר מדי'],
    maxlength: [255, 'תיאור העסק ארוך מדי']
  },

  community: {
    type: String,
    required: [true, 'ציין את עדת העסק'],
    trim: true,
    minlength: [3, 'עדה קצרה מדי'],
    maxlength: [20, 'עדה ארוכה מדי']
  },

  kosher: {
    type: Boolean,
    required: [true, 'ציין את כשרות העסק']
  },

  openingHours: {
    sunday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    monday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    tuesday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    wednesday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    thursday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    friday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    },

    saturday: {
      open: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      },
      close: {
        type: Number,
        required: [true, 'ציין את שעות הפעילות'],
        min: [0, 'הזמן לא תקין'],
        max: [25, 'הזמן לא תקין']
      }
    }
  },

  menu: {
    type: String,
    required: [true, 'הזמן קישור לתפריט'],
    trim: true,
    minlength: [10, 'הקישור לא תקין'],
    maxlength: [150, 'הקישור לא תקין']
  },

  website: {
    type: String,
    minlength: [4, 'כתובת האתר לא תקינה'],
    maxlength: [150, 'כתובת האתר לא תקינה'],
    required: [true, 'הזמן קישור לאתר המסעדה'],
    trim: true
  },

  // Will be changed later (multer)
  logo: {
    type: String,
    // required: [true, 'הזן קישור ללוגו המסעדה'],
    trim: true,
    minlength: 3,
    maxlength: 30,
    default: 'user.jpeg'
  },

  gallery: [{ type: String, minlength: 8, maxlength: 15, default: 'user.jpeg' }],

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // required: [true, 'Restaurant must have an owner'],
  },

  rating: {
    type: Number,
    min: 0,
    max: 5
  }

  //   active: {
  //     type: Boolean,
  //     default: true,
  //     select: false
  //   }
});

const Rest = mongoose.model('Rest', restSchema);

module.exports = Rest;
