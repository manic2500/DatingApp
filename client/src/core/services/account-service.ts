import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api';
  currentUser = signal<User | null>(null);

  login(creds: LoginCreds) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, creds).pipe(
      tap(user => this.setCurrentUser(user))// tap is used for side effect
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(creds: RegisterCreds) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, creds).pipe(
      tap(user => this.setCurrentUser(user))
    )
  }

  private setCurrentUser(user: User) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      this.currentUser.set(user);
    }
  }
}
