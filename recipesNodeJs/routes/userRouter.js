
import bodyParser from "body-parser";
import { Router } from "express";
import userController from "../controllers/userController.js";
import userLogger from '../middlewares/userLogger.middleware.js';

const userRouter = Router();

// לצורך שימוש בקבצי JSON
userRouter.use(bodyParser.json());

// שליפת כל המשתמשים
userRouter.get('/getAll', userController.getAll);

//הוספת משתמש
//userRouter.post('/add',userController.addUser);
userRouter.post('/add', userLogger, userController.addUser);
//כך את מחברת את ה-Middleware לפעולה.


//שליפת משתמש על ידי שם משתמש וסיסמא
userRouter.get('/getBynameBypass',userController.userByNameBypass)

//התחברות על ידי פוסט ולא גאט
userRouter.post('/login', userController.loginByNameBypass);


//הוספת מתכון מעודף על המשתמש
userRouter.post('/addFavorite',userController.addFavoriteRecipe)

//עדכון מתכון למערך מתכונים האוהבים
userRouter.put('/updateFavorite',userController.updateFavoriteRecipe)

//שליפת שמות המתכונים שהמשתמש אוהב
userRouter.get('/getFavoriteNames/:id',userController.getFavoriteRecipeNames)

export default userRouter
