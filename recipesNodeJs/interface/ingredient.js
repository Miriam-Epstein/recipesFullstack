
import mongoose from "mongoose";

//ממשק למרכיבי מתכון 
const ingredientsModel =  mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true }
},
     { _id: false }
)

export default ingredientsModel