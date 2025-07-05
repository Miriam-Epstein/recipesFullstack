import mongoose from "mongoose";
import myvalidate from "../validators/myvalidate.js";
import ingredientsModel from "../interface/ingredient.js";

// יצירת סכמת המתכון
const recipeModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => myvalidate.checkRecipeName(value),
      message: "שם המתכון חייב להיות תקני"
    }
  },
  description: {
    type: String,
    required: true,
    // validate: {
    //   validator: (value) => myvalidate.checkDescription(value),
    //   message: "תיאור המתכון חייב להיות תקני"
    // }
    },

  image: {
    type: String,
    required: true,
    // validate: {
    //  validator: (value) => myvalidate.checkImage(value),
    //   message: "הקישור לתמונה חייב להיות תקני"
    // }
  },
  level: {
    type: String,
    enum: ['קל', 'בינוני', 'קשה'],
    required: true,
    // validate: {
    //   validator: (value) => myvalidate.checkLevel(value),
    //   message: "רמת הקושי חייבת להיות אחת מבין: קל, בינוני, קשה"
    // }
  },
  time: {
    type: String,
    required: true,
    // validate: {
    //  validator: (value) => myvalidate.checkTime(value),
    //   message: "זמן הכנה חייב להיות תקני"
    // }
  },
  type: {
    type: String,
    enum: ['חלבי', 'בשרי', 'פרווה'],
    required: true,
    // validate: {
    //   validator: (value) => myvalidate.checkType(value),
    //   message: "סוג המתכון חייב להיות: חלבי, בשרי או פרווה"
    // }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userCollection',
    required: true
  },


  // ingredients: [{
  //   name: { type: String, required: true },
  //   amount: { type: String, required: true }
  // }]

  ingredients:{
      type: [ingredientsModel],
        require: false
  }
}, 
// כדי שלא יוצג השדה V_ כרגע אין לי צורך בו
{ versionKey: false }
); 




// יצירת מודל המתכון

export default mongoose.model("recipeCollection" ,recipeModel );
