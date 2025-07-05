import fs from 'fs';
import path from 'path';

// Middleware שמקליט שם משתמש, סיסמה ותאריך כניסה
const userLogger = (req, res, next) => {
  const { userName, password } = req.body;
  
  const now = new Date().toLocaleString();

  const logLine = `User: ${userName}, Password: ${password}, Date: ${now}\n`;

  // נתיב לקובץ הלוג
  const logFilePath = path.join('logs', 'users-log.txt');

  // כתיבה לקובץ (יצירה אם לא קיים)
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error('שגיאה בכתיבת הלוג:', err);
    }
  });

  next(); // ממשיך ל-Controller
};

export default userLogger;
