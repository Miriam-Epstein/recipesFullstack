

import userModel from "../models/userModel.js";



const userController = {

    getAll: (req, res) => {
        try {
            // שליפת כל המשתמשים מתוך MongoDB
           // userModel.find({}, { _id: 0 }) // לא נשלוף את ה־_id
            userModel.find({}) 
                .then((datafrommongo) => {
                    if (datafrommongo.length === 0) {
                        return res.status(404).json({ message: "לא נמצאו משתמשים" });
                    }
                    res.status(200).json(datafrommongo); // מחזירים את כל המשתמשים
                })
                .catch((err) => {
                    res.status(500).json({ message: "שגיאה בשליפת המשתמשים", error: err.message });
                });
        } catch (e) {
            res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message });
        }
    },

    //הוספת משתמש לאתר
    addUser: (req, res) => {
    try {
        const userData = req.body;

        const newUser = new userModel(userData);

        newUser.save()
            .then((savedUser) => {
                // הסתרת הסיסמה מהתגובה
                const { password, ...userWithoutPassword } = savedUser.toObject();
                res.status(201).json({
                    message: "המשתמש נוסף בהצלחה",
                    user: userWithoutPassword
                });
            })
            .catch((err) => {
                if (err.name === "ValidationError" || err.code === 11000) {
                    res.status(400).json({
                        message: "שגיאה בנתונים שנשלחו",
                        error: err.message || "שם משתמש כבר קיים"
                    });
                } else {
                    res.status(500).json({
                        message: "שגיאה בשמירת המשתמש למסד הנתונים",
                        error: err.message
                    });
                }
            });

    } catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת בעת הוספת משתמש",
            error: e.message
        });
    }
},
//שליפת משתמש על ידי שם משתמש וסיסמא

userByNameBypass: (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "חובה לשלוח גם שם משתמש וגם סיסמה" });
        }

        userModel.findOne({ userName, password })
            .then((foundUser) => {
                if (!foundUser) {
                    return res.status(401).json({ message: "שם המשתמש או הסיסמה שגויים" });
                }

                
                res.status(200).json({
                    message: "המשתמש התחבר בהצלחה",
                    user: foundUser
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "שגיאה בחיפוש המשתמש במסד הנתונים",
                    error: err.message
                });
            });

    } 
    catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת בעת התחברות",
            error: e.message
        });
    }
},

//קודים בשביל בדיקת התחברות לקוח

loginByNameBypass: (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "חובה לשלוח גם שם משתמש וגם סיסמה" });
        }

        userModel.findOne({ userName, password })
            .then((foundUser) => {
                if (!foundUser) {
                    return res.status(401).json({ message: "שם המשתמש או הסיסמה שגויים" });
                }

                res.status(200).json({
                    message: "המשתמש התחבר בהצלחה",
                    user: foundUser
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "שגיאה בחיפוש המשתמש במסד הנתונים",
                    error: err.message
                });
            });

    } catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת בעת התחברות",
            error: e.message
        });
    }
},



//עדכון מתכון למערך מתכונים האוהבים
updateFavoriteRecipe: (req, res) => {
    try {
        const { userId, oldRecipeId, newRecipeId } = req.body;

        if (!userId || !oldRecipeId || !newRecipeId) {
            return res.status(400).json({ message: "חסרים נתונים - יש לשלוח userId, oldRecipeId ו-newRecipeId" });
        }

        userModel.findById(userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: "משתמש לא נמצא" });
                }

                const index = user.favoriteRecipes.indexOf(oldRecipeId);
                if (index === -1) {
                    return res.status(404).json({ message: "המתכון הישן לא קיים ברשימת המועדפים" });
                }

                // עדכון המתכון הישן בחדש
                //במיקום שנמצא המתכון הישן נכניס את המתכון החדש
                user.favoriteRecipes[index] = newRecipeId;

                user.save()
                    .then((updatedUser) => {
                        res.status(200).json({
                            message: "המתכון עודכן בהצלחה ברשימת המועדפים",
                            favoriteRecipes: updatedUser.favoriteRecipes
                        });
                    })
                    .catch((saveErr) => {
                        res.status(500).json({
                            message: "שגיאה בשמירת המשתמש לאחר עדכון",
                            error: saveErr.message
                        });
                    });
            })
            .catch((findErr) => {
                res.status(500).json({
                    message: "שגיאה באיתור המשתמש",
                    error: findErr.message
                });
            });
    } catch (e) {
        res.status(500).json({
            message: "שגיאה כללית בשרת",
            error: e.message
        });
    }
},

//הוספת מתכון מעודף על המשתמש

addFavoriteRecipe: (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        if (!userId || !recipeId) {
            return res.status(400).json({ message: "חובה לשלוח גם מזהה משתמש וגם מזהה מתכון" });
        }

        userModel.findById(userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: "המשתמש לא נמצא" });
                }

                // בדיקה אם המתכון כבר קיים ברשימת המועדפים
                if (user.favoriteRecipes.includes(recipeId)) {
                    return res.status(409).json({ message: "המתכון כבר נמצא ברשימת המועדפים" });
                }

                // הוספה למערך ושמירה
                //מוסיף מתכון למערך של מתכונים מעודפים של המשתמש
                user.favoriteRecipes.push(recipeId);
                //שמירת נתוני המשתמש
                user.save()
                    .then((updatedUser) => {
                        res.status(200).json({
                            message: "המתכון נוסף לרשימת המועדפים בהצלחה",
                            favoriteRecipes: updatedUser.favoriteRecipes
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: "שגיאה בשמירת המשתמש", error: err.message });
                    });
            })
            .catch((err) => {
                res.status(500).json({ message: "שגיאה בשליפת המשתמש", error: err.message });
            });

    } catch (e) {
        res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message });
    }
},


//שליפת שמות המתכונים שהמשתמש אוהב

    getFavoriteRecipeNames: (req, res) => {
    try {
        const userId = req.params.id;  // מקבלים את מזהה המשתמש מה-URL

        userModel.findById(userId)
            //populate- יש אפשרות לבחור שדות נוספים מהאוביקיט שייוצגו
            .populate('favoriteRecipes', 'name') // מציג רק את שמות המתכונים לא את כל המתכון
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "המשתמש לא נמצא" });
                }
                // חיפוש שמות המתכונים בלבד מתוך המערך
                const recipeNames = user.favoriteRecipes.map(recipe => recipe.name);//מחפש רק את השם

                res.status(200).json({
                    favoriteRecipeNames: recipeNames
                });
            })
            .catch(err => {
                res.status(500).json({ message: "שגיאה בשליפת המתכונים האהובים", error: err.message });
            });
    } catch (e) {
        res.status(500).json({ message: "שגיאה כללית בשרת", error: e.message });
    }
},

};




export default userController;

