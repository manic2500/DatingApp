import { Component, inject, input, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { handleSubscription } from '../../../shared/utility';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected creds = {} as RegisterCreds;
  private acctService = inject(AccountService);
  //public members = input.required<User[]>();
  showRegister = output<boolean>();


  register() {
    this.acctService.register(this.creds).subscribe(
      handleSubscription((res) => {
        console.log(res);
        this.cancel();
      })
    );
    //console.log(this.creds);
  }

  cancel() {
    this.showRegister.emit(false)
    console.log('Cancelled');
  }



}
