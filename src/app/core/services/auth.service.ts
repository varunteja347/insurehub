import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'insurehub_is_logged_in';
  private userRoleKey = 'insurehub_user_role';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  getUserRole(): 'user' | 'surveyor' {
    return (localStorage.getItem(this.userRoleKey) as 'user' | 'surveyor') || 'user';
  }

  login(role: 'user' | 'surveyor' = 'user') {
    localStorage.setItem(this.loggedInKey, 'true');
    localStorage.setItem(this.userRoleKey, role);
  }

  logout() {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem(this.userRoleKey);
  }
}
