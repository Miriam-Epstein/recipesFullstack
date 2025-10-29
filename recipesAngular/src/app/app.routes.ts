import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import {UsersListComponent}  from './components/users-list/users-list.component'
import { FavoriteRecipesComponent } from './components/favorite-recipes/favorite-recipes.component';
//import {authGuard} from './guard/auth.guard';


export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-recipe', component: AddRecipeComponent  },  //,canActivate: [authGuard]
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'usersList', component: UsersListComponent },
  { path: 'favorites', component: FavoriteRecipesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];
