import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { BaseApiService } from './base-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseApiService {
  constructor(private http: HttpClient, toastr: ToastrService) {
    super(toastr);
  }

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
  public setCurrentUserFromStorage() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.currentUser.set(user);
  }
}
