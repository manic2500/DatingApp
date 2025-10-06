import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { handleSubscription } from '../../shared/utility';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css'
})
export class TestErrors {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:5001/api/buggy'
  validationErrors = signal<string[]>([]);


  get404Error() {
    this.http.get(this.baseUrl + '/not-found').subscribe(handleSubscription(
      (res) => console.log(res)
    ))
  }
  get400Error() {
    this.http.get(this.baseUrl + '/bad-request').subscribe(handleSubscription(
      (res) => console.log(res)
    ))
  }
  get500Error() {
    this.http.get(this.baseUrl + '/server-error').subscribe(handleSubscription(
      (res) => console.log(res)
    ))
  }
  get401Error() {
    this.http.get(this.baseUrl + '/auth').subscribe(handleSubscription(
      (res) => console.log(res)
    ))
  }
  get400ValidationError() {
    this.http.post('https://localhost:5001/api/account/register', {}).subscribe(handleSubscription(
      (res) => console.log(res),
      (error) => {
        this.validationErrors.set(error)
      }
    ))
  }
}
