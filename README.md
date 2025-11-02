# 🍰 Recipes Fullstack - אתר מתכונים מלא

אתר מתכונים מקצועי עם Angular Frontend ו-Node.js Backend

## 📋 תיאור הפרויקט

אתר מתכונים אינטראקטיבי המאפשר למשתמשים להוסיף, לצפות ולנהל מתכונים מועדפים. האתר כולל מערכת התחברות מלאה, ניהול משתמשים וממשק משתמש מתקדם ומעוצב.

## ✨ תכונות עיקריות

### 🎨 עיצוב מתקדם
- **עיצוב מודרני ומקצועי** - צבעי קרם-כתום נעימים ומרגיעים
- **אנימציות מתקדמות** - אפקטי hover, float, glow, bounce ו-shake
- **Glassmorphism** - אפקט זכוכית מטושטשת על כרטיסים
- **Stagger Animations** - אנימציות מדורגות לכרטיסים
- **Responsive Design** - מתאים לכל המסכים

### 🎯 פונקציונליות

#### דף הבית
- הצגת כל המתכונים בגריד יפה
- כרטיסי מתכון מעוצבים עם תמונות
- הוספה למועדפים (עם טיפול בשגיאות)
- אפקטי hover מתקדמים

#### ניהול משתמשים
- התחברות והרשמה
- ניהול פרופיל משתמש
- רשימת משתמשים

#### ניהול מתכונים
- הוספת מתכון חדש (עם מרכיבים)
- צפייה בפרטי מתכון
- ניהול רשימת מועדפים
- טיפול בתמונות חסרות/שגויות

#### Footer מקצועי
- קישורים מהירים
- פרטי יצירת קשר
- רשתות חברתיות
- אנימציות מתקדמות

## 🛠️ טכנולוגיות

### Frontend
- **Angular 19** - Framework מתקדם
- **TypeScript** - פיתוח בטוח ומודרני
- **CSS3** - אנימציות מתקדמות ו-Effects
- **Bootstrap Icons** - אייקונים מקצועיים
- **Google Fonts (Heebo)** - טיפוגרפיה עברית מעולה

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📁 מבנה הפרויקט

```
recipesFullstack/
├── recipesAngular/          # Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # כל הקומפוננטות
│   │   │   ├── services/    # שירותים
│   │   │   ├── models/      # מודלים
│   │   │   └── styles.css   # עיצוב גלובלי
│   └── package.json
│
└── recipesNodeJs/           # Backend Application
    ├── controllers/         # בקרים
    ├── models/              # מודלים
    ├── routes/              # Routes
    └── package.json
```

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 14 ומעלה)
- npm או yarn
- MongoDB

### התקנת Frontend

```bash
cd recipesAngular
npm install
ng serve
```

האתר יפעל על: `http://localhost:4200`

### התקנת Backend

```bash
cd recipesNodeJs
npm install
node app.js
```

השרת יפעל על: `http://localhost:1234`

## 📝 רשימת הקומפוננטות

### Components

1. **HomeComponent** - דף הבית עם כל המתכונים
2. **LoginComponent** - עמוד התחברות
3. **SignupComponent** - עמוד הרשמה
4. **AddRecipeComponent** - הוספת מתכון חדש
5. **RecipeDetailsComponent** - פרטי מתכון
6. **FavoriteRecipesComponent** - רשימת מועדפים
7. **UsersListComponent** - רשימת משתמשים
8. **NavComponent** - תפריט ניווט
9. **FooterComponent** - תחתית האתר (חדש!)

## 🎨 שיפורי עיצוב שהוכנסו

### אנימציות CSS
- **fadeIn** - אפקט הופעה
- **slideInUp/Left/Right/Down** - החלקות
- **zoomIn** - הגדלה
- **float** - ציפה
- **glow** - זוהר
- **bounce** - קפיצה
- **shake** - רעדה
- **wiggle** - נדנוד
- **heartBeat** - פעימת לב
- **rotate** - סיבוב

### אפקטים מתקדמים
- **Glassmorphism** - אפקט זכוכית
- **Shimmer Effect** - אפקט ברק על hover
- **Ripple Effect** - אפקט אדווה על כפתורים
- **Stagger Animations** - אנימציות מדורגות
- **Smooth Transitions** - מעברים חלקים

### טיפול בתמונות
- טיפול בשגיאות טעינה
- Placeholder אוטומטי לתמונות חסרות
- Lazy loading

## 🔧 שיפורים טכניים

### טיפול בשגיאות
- בדיקת מתכון קיים במועדפים (409 Conflict)
- הודעות שגיאה ברורות ומתאימות
- טיפול בתמונות חסרות/שגויות

### אופטימיזציה
- Lazy loading לתמונות
- CSS transitions מותאמים
- Animations מותאמות לביצועים

## 📱 Responsive Design

האתר מותאם לכל המסכים:
- Desktop
- Tablet
- Mobile

## 👨‍💻 מפתח/ת

**Miryam Epstein**
- Email: m0533123308@gmail.com
- Phone: 0533123308

## 📄 רישיון

כל הזכויות שמורות © 2025

## 🔄 היסטוריית עדכונים

### עדכון אחרון - שיפור עיצוב מקצועי
- ✅ הוספת אנימציות מתקדמות לכל הקומפוננטות
- ✅ יצירת Footer מקצועי
- ✅ שיפור טיפול בשגיאות מועדפים
- ✅ הוספת Google Fonts (Heebo)
- ✅ שיפור UX/UI בכל העמודים
- ✅ Glassmorphism effects
- ✅ Shimmer & Ripple effects
- ✅ טיפול בתמונות חסרות

## 🌟 תכונות מיוחדות

- עיצוב ייחודי עם פלטת צבעים קרם-כתום
- אנימציות חלקות ומקצועיות
- ממשק משתמש אינטואיטיבי
- טיפול מתקדם בשגיאות
- חוויית משתמש מעולה

---

**Website opens by Miryam Epstein**

🍰 Happy Cooking! 🍰

