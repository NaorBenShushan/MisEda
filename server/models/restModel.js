const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "שם המסעדה לא תקין"],
    maxlength: [15, "שם המסעדה לא תקין"],
    required: [true, "ציין את שם המסעדה"],
  },

  address: {
    city: {
      type: String,
      minlength: [2, "שם העיר לא תקין"],
      maxlength: [30, "שם העיר לא תקין"],
      required: [true, "ציין את שם העיר"],
    },

    street: {
      type: String,
      minlength: [2, "שם הרחוב לא תקין"],
      maxlength: [30, "שם הרחוב לא תקין"],
      required: [true, "ציין את שם הרחוב"],
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
    unique: [true, "מספר הטלפון קיים במערכת"],
  },

  decription: {
    type: String,
    minlength: [15, "תיאור העסק קצר מדי"],
    maxlength: [255, "תיאור העסק ארוך מדי"],
    required: [true, "תאר את העסק"],
  },

  community: {
    type: String,
    minlength: [15, "תיאור העסק קצר מדי"],
    maxlength: [20, "תיאור העסק ארוך מדי"],
    required: [true, "ציין את עדת העסק"],
  },

  kosher: {
    type: Boolean,
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
    },
  },

  menu: {
    type: String,
    minlength: [4, "התפריט לא תקין"],
    maxlength: [150, "התפריט לא תקין"],
  },

  website: {
    type: String,
    minlength: [7, "כתובת האתר לא תקינה"],
    maxlength: [150, "כתובת האתר לא תקינה"],
  },

  // Will be changed later
  logo: {
    type: String,
    minlength: 8,
    maxlength: 15,
    default: "user.jpeg",
  },

  //How to add an array to the Schema?
  /*     gallery: {
      [ 
        {type: String,
         minlength: 8,
         maxlength: 15,
         default: "user.jpeg"},  
        {type: String,
         minlength: 8,
         maxlength: 15,
         default: "user2.jpeg"},  
        {type: String,
         minlength: 8,
         maxlength: 15,
         default: "user3.jpeg"}
      ],      
             }, */

  ownerId: {
    type: String,
    minlength: 10,
    maxlength: 255,
  },

  //How to add an array to the Schema?
  /* reviews: {
        [ 
            {type: String,
            minlength: 20,
            maxlength: 1200},
            {type: String,
            minlength: 20,
            maxlength: 1200},
            {type: String,
            minlength: 20,
            maxlength: 1200},
      ],            
    }, */

  rating: {
    type: Number,
    minlength: 1,
    maxlength: 3,
  },

  active: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
