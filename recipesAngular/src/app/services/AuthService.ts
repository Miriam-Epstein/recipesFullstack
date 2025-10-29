import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: User | null = null;


  constructor() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
    const userJson = sessionStorage.getItem('loggedInUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }
}

  setUser(user: User) {
    this.currentUser = user;
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    console.log(' משתמש נשמר:', this.currentUser);
  }

  getUser(): User | null {
      console.log('שליפת משתמש:', this.currentUser);
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('loggedInUser');
  }

getUserName(): string | null {
  return this.currentUser ? this.currentUser.userName : null; 
}


getUserId(): string | null {
  return this.currentUser?._id || null;
}

}


