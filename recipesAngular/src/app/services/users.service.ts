import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.model'
import { map } from 'rxjs/operators';  // ייבוא של אופרטור map



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private Url = 'http://localhost:1234/user';

  constructor(private http: HttpClient) { }

  // שליפת כל המשתמשים
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.Url}/getAll`);
  }

  // הוספת משתמש חדש
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.Url}/add`, user);
  }

  // התחברות לפי שם וסיסמה
  getUserByNameAndPass(userName: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.Url}/getBynameBypass`, {
      params: { userName, password }
    });
  }

   
// loginUserByNameAndPass(userName: string, password: string): Observable<User> {
//   return this.http.post<User>(`${this.Url}/login`, { userName, password });
// }
// יש להשתמש ב-pipe  בפרויקט 
loginUserByNameAndPass(userName: string, password: string): Observable<User> {
  return this.http.post<{ message: string, user: User }>(`${this.Url}/login`, { userName, password })
    .pipe(
      map(res => res.user)  // מחלץ רק את ה-user מתוך התגובה
    );
}



  // הוספת מתכון למועדפים
  addFavorite(userId: string, recipeId: string): Observable<any> {
    return this.http.post(`${this.Url}/addFavorite`, { userId, recipeId });
  }

  // עדכון מתכון מועדף קיים
  updateFavorite(userId: string, oldRecipeId: string, newRecipeId: string): Observable<any> {
    return this.http.put(`${this.Url}/updateFavorite`, { userId, oldRecipeId, newRecipeId });
  }

  // // שליפת שמות מתכונים מועדפים לפי מזהה משתמש
  // getFavoriteNames(userId: string): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.Url}/getFavoriteNames/${userId}`);
  // }

  //***שינוי טיפוס ההחזרה בשביל עמוד מתכונים מועדפים על המשתמש****
  getFavoriteNames(userId: string): Observable<{ favoriteRecipeNames: string[] }> {
  return this.http.get<{ favoriteRecipeNames: string[] }>(`${this.Url}/getFavoriteNames/${userId}`);
}




}
