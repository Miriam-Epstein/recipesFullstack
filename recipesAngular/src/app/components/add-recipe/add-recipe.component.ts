import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { Recipe, Ingredient } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {

  // שדות המתכון
  name = '';
  description = '';
  image = '';
  level = '';
  time = '';
  type = '';

  ingredients: Ingredient[] = [];

  // שדות להוספת מרכיב זמני לפני הוספה למערך
  ingredientName = '';
  ingredientAmount = '';

  error = '';

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      alert('עליך להתחבר כדי להוסיף מתכון');
      this.router.navigate(['/login']);
    }
  }

  // פונקציה להוספת מרכיב למערך המרכיבים
  addIngredient() {
    if (this.ingredientName && this.ingredientAmount) {
      this.ingredients.push({
        name: this.ingredientName,
        amount: this.ingredientAmount
      });
      this.ingredientName = '';
      this.ingredientAmount = '';
    }
  }

  // פונקציה לשמירת המתכון החדש
  addRecipe() {
    const user = this.authService.getUser();
    console.log('user:',  JSON.stringify(user, null, 2));


    if (!user || !user._id) {
    console.error('שגיאה: המשתמש לא מחובר או אין לו מזהה');
    return;
     }

    const newRecipe: Recipe = {
      name: this.name,
      description: this.description,
      image: this.image,
      level: this.level,
      time: this.time,
      type: this.type,
      userId: user._id, // נניח שיש לך מזהה משתמש בשירות האותנטיקציה
      ingredients: this.ingredients,
    };

    this.recipesService.addRecipe(newRecipe).subscribe({
      next: (res) => {
     alert(res.message || 'המתכון נוסף בהצלחה!');
     console.log('recipe to send:', newRecipe);
     this.router.navigate(['/']);
    },
      error: err => {
        this.error = err.error?.message || 'הוספת המתכון נכשלה. נסי שוב.';
       console.error('Error adding recipe:', err);
      }
    });
  }
}
