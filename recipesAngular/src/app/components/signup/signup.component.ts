import { Component, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {CommonModule} from '@angular/common'
import { RouterLink,Router } from '@angular/router';
import {User} from '../../models/user.model'
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

 // שדות הטופס
  userName = '';
  password = '';
  address = '';
  phone = '';

  // שגיאה אם יש
  error = '';

  constructor(private usersService: UsersService, private router: Router) {}

  register() {
    const newUser: User = {
      userName: this.userName,
      password: this.password,
      address: this.address,
      phone: this.phone,
      isAdmin: false,
      favoriteRecipes: [] // את שמה ריק - לא מהמשתמש
    };

    this.usersService.addUser(newUser).subscribe({
      next: () => {
        alert('נרשמת בהצלחה!');
        this.router.navigate(['/login']); // ניתוב להתחברות
      },
      error: err => {
     this.error = err.error?.message || 'ההרשמה נכשלה. נסי שוב.';
     console.error(err);
     }
    });
  }



}

