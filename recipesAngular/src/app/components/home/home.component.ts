import { Component,OnInit} from '@angular/core';
import { RouterLink, RouterOutlet,  } from '@angular/router';
import { RecipesService } from '../../services/recipes.service'; 
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { AuthService } from '../../services/AuthService';
import { UsersService } from '../../services/users.service'; 
import { CommonModule ,NgForOf} from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule,NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   
 recipes:Recipe[]=[];

 getImageUrl(recipe: Recipe): string {
   if (!recipe.image || recipe.image.trim() === '') {
     return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y1ZTJjYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM3YzRhMGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7XkNeU15Ig15DXlNeQ15jXlCAo15XXnNeR15QpPC90ZXh0Pjwvc3ZnPg==';
   }
   return `http://localhost:1234/img/${recipe.image}`;
 }

 onImageError(event: any, recipe: Recipe) {
   event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y1ZTJjYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM3YzRhMGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7XkNeU15Ig15DXlNeQ15jXlCAo15XXnNeR15QpPC90ZXh0Pjwvc3ZnPg==';
 }




 constructor(private RecipesService:RecipesService ,
             private authService:AuthService,
             private router:Router,
             private UsersService:UsersService
          ) {}


 ngOnInit(): void{
  this.RecipesService.getAllRecipes().subscribe({
    next:(data) =>{
      this.recipes=data;
    },
    error:(err)=>{
      console.error('שגיאה בשליפת המתכונים',err)
    }
  });
 }

addToFavorites(recipeId?: string) {
  if (!recipeId) {
    alert('שגיאה: המתכון חסר מזהה');
    return;
  }

  if (!this.authService.isLoggedIn()) {
    alert('עליך להתחבר כדי להוסיף למועדפים');
    this.router.navigate(['/login']);
    return;
  }

  
  const userId = this.authService.getUserId();
  if (userId) {
    this.UsersService.addFavorite(userId, recipeId).subscribe({
      next: (response) => {
        console.log('נוסף למועדפים');
        alert('המתכון נוסף למועדפים בהצלחה! 🎉');
      },
      error: err => {
        console.error('שגיאה בהוספה', err);
        
        // בדיקה אם המתכון כבר קיים (status 409)
        if (err.status === 409) {
          const errorMessage = err.error?.message || 'המתכון כבר נמצא ברשימת המועדפים שלך!';
          alert(errorMessage + ' ❤️');
        } else {
          // שגיאה אחרת
          const errorMessage = err.error?.message || 'אירעה שגיאה בעת ההוספה למועדפים';
          alert(errorMessage);
        }
      }
    });
    } else {
     alert('אנא התחברי כדי לשמור מועדפים');
     this.router.navigate(['/login']);
     }
}

}




