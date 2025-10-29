import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Recipe}  from '../models/recipe.model'


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private Url = 'http://localhost:1234/recipe';
  

  constructor(private http: HttpClient) {}


  // שליפת כל המתכונים
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.Url}/getAll`);
  }

  // שליפת מתכון לפי ID
  getRecipeById(id: string): Observable<Recipe> {
       return this.http.get<Recipe>(`${this.Url}/getById/${id}`);
  }

  // הוספת מתכון חדש
  addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(`${this.Url}/add`, recipe);
  }

  // מחיקת מתכון ללא תנאים
  simpleDelete(id: string): Observable<any> {
    return this.http.delete(`${this.Url}/simpleDelete/${id}`);
  }

  // מחיקה עם תנאים (סיסמה + משתמש מחובר)
  deleteWithCondition(id: string, customerId: string, password: string): Observable<any> {
    return this.http.request('delete', `${this.Url}/deleteWithCondition/${id}`, {
      body: { customerId, password }
    });
  }

  // עדכון מתכון קיים
  updateRecipe(id: string, updatedRecipe: Recipe): Observable<any> {
    return this.http.put(`${this.Url}/update/${id}`, updatedRecipe);
  }
}
