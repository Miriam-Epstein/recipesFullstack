import { Component , OnInit , Input} from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute,RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-recipe-details',
  standalone:true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

     recipe?: Recipe;
    
     constructor(private route: ActivatedRoute, private recipeService: RecipesService) {}
        
ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (data) => {
          this.recipe = data;
        },
        error: (err) => {
          console.error('שגיאה בשליפת מתכון:', err);
        }
      });
    }
  }

  getImageUrl(recipe: Recipe): string {
    if (!recipe.image || recipe.image.trim() === '') {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZTJjYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3YzRhMGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7XkNeU15Ig15DXlNeQ15jXlCAo15XXnNeR15QpPC90ZXh0Pjwvc3ZnPg==';
    }
    return `http://localhost:1234/img/${recipe.image}`;
  }

  onImageError(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZTJjYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3YzRhMGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7XkNeU15Ig15DXlNeQ15jXlCAo15XXnNeR15QpPC90ZXh0Pjwvc3ZnPg==';
  }

}

