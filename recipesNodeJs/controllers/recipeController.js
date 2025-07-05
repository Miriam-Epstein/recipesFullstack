
import recipeModel from "../models/recipeModel.js"
import userModel from "../models/userModel.js";

const recipeController = {

 getAll: (req, res) => {
        try {
            recipeModel.find({})
                .then((datafrommongo) => {
                    res.status(200).json(datafrommongo)
                })
                .catch((err) => {
                    res.status(500).json({ message: "שגיאה בשליפת המתכונים", error: err.message })
                });
        } catch (e) {
            res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message })
        }
    },
    
getById: (req, res) => {
    try {
        const recipeId = req.params.id;  // קבלת ה-ID מה-URL

        recipeModel.findById(recipeId)
            .then((datafrommongo) => {
                if (!datafrommongo) {
                    return res.status(404).json({ message: "המתכון לא נמצא" });
                }
                res.status(200).json(datafrommongo);  // אם המתכון נמצא, מחזירים אותו
            })
            .catch((err) => {
                res.status(500).json({ message: "שגיאה בשליפת המתכון", error: err.message });
            });
    } catch (e) {
        res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message });
    }
},


//מחיקת מתכון לפי אידי ללא תנאי של לקוח אומנהל
simpleDelete: (req, res) => {
     try {
        const recipeId = req.params.id; // קבלת ה-ID מה-URL

        recipeModel.findByIdAndDelete(recipeId)
            .then((deletedRecipe) => {
                if (!deletedRecipe) {
                    return res.status(404).json({ message: "המתכון לא נמצא למחיקה" });
                }
                res.status(200).json({
                    message: "המתכון נמחק בהצלחה",
                    deletedRecipe: deletedRecipe
                });
            })
            .catch((err) => {
                res.status(500).json({ message: "שגיאה במחיקת המתכון", error: err.message });
            });
    } catch (e) {
        res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message });
    }
},

//---הוספת מתכון----
addRecipe: (req, res) => {
    console.log(req.body);
    try {
        // המרה של time למספר לפני יצירת המסמך
        const recipeData = {
            ...req.body,
            time: (req.body.time)  // המרה למספר
        };

        const newRecipe = new recipeModel(recipeData);

        newRecipe.save()
            .then((savedRecipe) => {
                res.status(201).json({
                    message: "המתכון נוסף בהצלחה",
                    recipe: savedRecipe
                });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "שגיאה בשמירת המתכון למסד הנתונים",
                    error: err.message
                });
            });
    } catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת בעת הוספת מתכון",
            error: e.message
        });
    }
},
//***************************** */
//מחיקת המנהל או בעל המתכון שמחובר לאתר

deleteWithCondition: (req, res) => {
  const recipeId = req.params.id;
  const { password, customerId } = req.body;

  recipeModel.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        return res.status(404).json({ message: "המתכון לא נמצא" });
      }

      return userModel.findById(customerId)
        .then(customer => {
          if (!customer) {
            return res.status(401).json({ message: "המשתמש לא נמצא" });
          }

          if (customer.password !== password) {
            return res.status(403).json({ message: "סיסמה שגויה" });
          }

          const isOwner = recipe.userId.toString() === customer._id.toString();
          const isAdmin = customer.isAdmin;

          if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: "אין לך הרשאה למחוק את המתכון הזה" });
          }

          return recipeModel.findByIdAndDelete(recipeId)
            .then(deletedRecipe => {
              if (!deletedRecipe) {
                return res.status(404).json({ message: "המתכון לא נמצא למחיקה" });
              }

              res.status(200).json({
                message: "המתכון נמחק בהצלחה",
                deletedRecipe: deletedRecipe
              });
            });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "שגיאה כללית בשרת", error: err.message });
    });
},

//עדכון מתכון

updateRecipe: (req, res) => {
    try {
        const recipeId = req.params.id;      
        const updateData = req.body;          

        
        recipeModel.findByIdAndUpdate(recipeId, updateData, { new: true, runValidators: true })
            .then((updatedRecipe) => {
                if (!updatedRecipe) {
                    return res.status(404).json({ message: "המתכון לא נמצא לעדכון" });
                }
                res.status(200).json({
                    message: "המתכון עודכן בהצלחה",
                    updatedRecipe: updatedRecipe
                });
            })
            .catch((err) => {
                res.status(400).json({ message: "שגיאה בעדכון המתכון", error: err.message });
            });

    } catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת בעת עדכון מתכון",
            error: e.message
        });
    }
},





};
export default recipeController;