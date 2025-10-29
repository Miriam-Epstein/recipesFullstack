import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
     
constructor(private authService: AuthService, private router: Router) {}



 get isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

logout() {
    this.authService.logout();
    this.router.navigate(['/home']); 
  }
  

get userName(): string | null {
  return this.authService.getUserName();
}


}
