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
  


}

