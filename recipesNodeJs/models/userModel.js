
import mongoose from "mongoose";
import myvalidate from "../validators/myvalidate.js";

// יצירת סכמת המשתמש
const userModel = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => myvalidate.checkUserName(value),
      message: "שם משתמש חייב להיות ייחודי ונכון"
    }
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value) => myvalidate.checkPassword(value),
    //   message: "   מכיל גם אות וגם מספר הסיסמה חייבת להיות לפחות 6 תווים"
    // }
  },
  address: {
    type: String,
    required: true,
    validate: {
      validator: (value) => myvalidate.checkAddress(value),
      message: "הכתובת חייבת להיות תקינה"
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => myvalidate.checkPhone(value),
      message: "הטלפון חייב להיות תקני"
    }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  
  favoriteRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipeCollection'
  }]
},
// כדי שלא יוצג השדה V_ כרגע אין לי צורך בו
{ versionKey: false }

);


// יצירת מודל המשתמש

export default mongoose.model("userCollection",userModel);
