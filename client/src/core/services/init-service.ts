import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  accountService = inject(AccountService)

  initApp() {
    this.accountService.setCurrentUserFromStorage();
  }
}
