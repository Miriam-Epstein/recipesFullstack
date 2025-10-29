
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-favorite-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-recipes.component.html',
  styleUrls: ['./favorite-recipes.component.css']
})
export class FavoriteRecipesComponent implements OnInit {
  favoriteNames: string[] = [];
  error: string = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    
    if (!user || !user._id) {
      alert('עליך להתחבר כדי לצפות במועדפים');
      this.router.navigate(['/login']);
      return;
    }

    this.usersService.getFavoriteNames(user._id).subscribe({
  next: (res) => {
    this.favoriteNames = res.favoriteRecipeNames;
  },
  error: (err) => {
    console.error('שגיאה בקבלת שמות מועדפים', err);
    this.error = 'שגיאה בקבלת נתונים מהשרת';
  }
});

}

}