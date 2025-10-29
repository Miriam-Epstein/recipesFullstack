import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/AuthService'
@Component({
  selector: 'app-login',
standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName = '';
  password = '';

  error = '';
  loggedInUser: User | null = null;

  constructor(private usersService: UsersService, 
              private router: Router,
             private authService: AuthService) {}


  login() {
    this.error = '';
    this.loggedInUser = null;

    this.usersService.loginUserByNameAndPass(this.userName, this.password).subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(user)
       this.authService.setUser(user);  // שמירת המשתמש במחלקת AuthService
        alert('התחברת בהצלחה!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error?.message || 'התחברות נכשלה. נסה שנית.';
        console.error(err);
        alert('אתה לא רשום באתר! תרשם תחילה בהצלחה!');
        this.router.navigate(['/signup']);

      }
    });
  }

}
