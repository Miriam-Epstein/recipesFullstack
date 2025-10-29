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
      next: () => {
        console.log(' נוסף למועדפים');
        alert('המתכון נוסף למועדפים בהצלחה!');
      },
      error: err => {
        console.error(' שגיאה בהוספה', err);
        alert('אירעה שגיאה בעת ההוספה למועדפים');
      }
    });
    } else {
     alert('אנא התחברי כדי לשמור מועדפים');
     this.router.navigate(['/login']);
     }
}

}




