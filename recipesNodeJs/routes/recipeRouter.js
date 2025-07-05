
import bodyParser from "body-parser";
import { Router } from "express";
import recipeController from "../controllers/recipeController.js";

const recipeRouter = Router();

// לצורך שימוש בקבצי JSON
recipeRouter.use(bodyParser.json());

// שליפת כל המתכונים
recipeRouter.get('/getAll', recipeController.getAll);

// שליפת מתכון לפי קוד
recipeRouter.get('/getById/:id', recipeController.getById);

//מחיקת מתכון לפי אידי ללא תנאי של לקוח אומנהל
recipeRouter.delete('/simpleDelete/:id',recipeController.simpleDelete);

//הוספת מתכון
recipeRouter.post('/add', recipeController.addRecipe)

//מחיקת המנהל או בעל המתכון שמחובר לאתר
recipeRouter.delete('/deleteWithCondition/:id',recipeController.deleteWithCondition);

//עדכון מתכון
recipeRouter.put('/update/:id',recipeController.updateRecipe)

export default recipeRouter
