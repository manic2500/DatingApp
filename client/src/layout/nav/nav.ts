import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle";
import { LoginCreds } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { handleSubscription } from '../../shared/utility';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, ThemeToggleComponent, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  protected creds: LoginCreds = { email: 'bob@test.com', password: 'password' }

  login() {
    this.accountService.login(this.creds!).subscribe(
      this.accountService.handleSubscription(
        () => {
          this.toastr.success('Logged in successfully')
          this.router.navigateByUrl('/members')
        }
      )
    )
  }

  logout() {
    this.accountService.logout();
    this.toastr.info('Logged out')
    this.router.navigateByUrl('/');
  }
}


/* 
handleSubscription(
        () => this.router.navigateByUrl('/members'),
        (error) => {
          this.toastr.error(error.error)
        }
      )
*/

/* 
{
      next: (result) => {
        this.router.navigateByUrl('/members');
        this.creds = null
      },
      error(err) {
        console.log(err);
      }
    }
*/