
const myvalidate = {

  // בדיקת שם משתמש
  checkUserName: (name) => {
    if (!name)
      throw new Error("שם משתמש הוא שדה חובה");

    if (!/^[A-Za-z\u0590-\u05FF\s]+$/.test(name))
      throw new Error("שם משתמש חייב להכיל רק אותיות בעברית או אנגלית");

    if (name.length > 20)
      throw new Error("שם משתמש לא יכול להיות ארוך מ־20 תווים");
  },

  //  בדיקת סיסמה
  checkPassword: (password) => {
    if (!password)
      throw new Error("סיסמה היא שדה חובה");

    if (password.length < 6 || password.length > 20)
      throw new Error("הסיסמה חייבת להיות בין 6 ל־20 תווים");

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
      throw new Error("הסיסמה חייבת להכיל גם אותיות וגם מספרים");
  },

  //  בדיקת כתובת
  checkAddress: (address) => {
    if (!address)
      throw new Error("כתובת היא שדה חובה");

    if (address.length < 5)
      throw new Error("כתובת חייבת להכיל לפחות 5 תווים");
  },

  //  בדיקת טלפון
  checkPhone: (phone) => {
    if (!phone)
      throw new Error("טלפון הוא שדה חובה");

    if (!/^0[2-9]\d{7,8}$/.test(phone))
      throw new Error("טלפון לא תקין. חייב להתחיל ב־0 ולהכיל 9 או 10 ספרות");
  },

  // בדיקת אם מנהל
  checkIsManager: (isManager) => {
    if (typeof isManager !== "boolean")
      throw new Error("שדה מנהל חייב להיות מסוג בוליאני (true/false)");
  },

  //  בדיקת שם מתכון
  checkRecipeName: (name) => {
    if (!name)
      throw new Error("שם מתכון הוא שדה חובה");

    if (name.length < 2)
      throw new Error("שם מתכון חייב להיות לפחות 2 תווים");
  },

  //  בדיקת תיאור תמונה
  checkDescription: (desc) => {
    if (!desc)
      throw new Error("תיאור תמונה הוא שדה חובה");

    if (desc.length < 5)
      throw new Error("תיאור תמונה חייב להכיל לפחות 5 תווים");
  },

  // בדיקת רמת קושי
  checkLevel: (level) => {
    const validLevels = ["קל", "בינוני", "קשה"];
    if (!validLevels.includes(level))
      throw new Error("רמה חייבת להיות אחד מהבאים: קל, בינוני, קשה");
  },

  // בדיקת משך זמן
  checkTime: (duration) => {
    if (duration == null)
      throw new Error("משך זמן הוא שדה חובה");

    if (typeof duration !== "number" || duration <= 0)
      throw new Error("משך זמן חייב להיות מספר חיובי");
  },

  //  בדיקת סוג
  checkType: (type) => {
    const validTypes = ["חלבי", "בשרי", "פרווה"];
    if (!validTypes.includes(type))
      throw new Error("סוג חייב להיות אחד מהבאים: חלבי, בשרי, פרווה");
  },

  //  בדיקת רכיבים
  checkIngredients: (ingredients) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0)
      throw new Error("יש להזין לפחות רכיב אחד");

    ingredients.forEach((ingredient, index) => {
      if (!ingredient.name|| typeof ingredient.name !== "string")
        throw new Error(`שם רכיב מספר ${index + 1} הוא שדה חובה`);

      if (!ingredient.amount || typeof ingredient.amount !== "string")
        throw new Error(`כמות רכיב מספר ${index + 1} היא שדה חובה`);
    });
  }
};

export default myvalidate;
