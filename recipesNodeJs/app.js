
import mongoose from "mongoose"
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import recipeRouter from "./routes/recipeRouter.js"
import userRouter from "./routes/userRouter.js"

//יצירת מופע מסוג שרת
const app=express()

app.use(express.static('public'));

//הוסיפי את ההגדרה הזו לשרת שלך, כדי לאפשר CORS
app.use(cors());


//בשביל הקובץ  EVN
dotenv.config()
//כתובת הדפדפן
app.listen(process.env.PORT,()=>{
    console.log('run  on port 1234!!!')
})

app.get('/', (req, res) => {
    res.send('שרת רץ בהצלחה!')
})


app.use('/recipe', recipeRouter)
app.use('/user',userRouter)

mongoose.connect(process.env.MONGO_URL)
.then(x=>{console.log("counnect to MongoDB!!!! good!!!")
})
.catch(i=>{
    console.log("err  connecting to MongoDB!!!!")
})


