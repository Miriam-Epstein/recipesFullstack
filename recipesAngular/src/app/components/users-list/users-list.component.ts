import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})

export class UsersListComponent  {
  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      err => {
        console.error('שגיאה בשליפת משתמשים:', err);
      }
    );
  }
   
//בשביל העיצוב מותאם לעמוד מתכונים
  trackUserId(index: number, user: any): string {
  return user._id;
   }


}


