import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle";
import { LoginCreds } from '../../types/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, ThemeToggleComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: LoginCreds | null = { email: 'bob@test.com', password: 'password' }

  login() {
    this.accountService.login(this.creds!).subscribe({
      next: (result) => {
        console.log(result)
        this.creds = null
      },
      error(err) {
        console.log(err);
      }
    })
  }

  logout() {
    this.accountService.logout();
  }
}
