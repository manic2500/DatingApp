import { Component, inject, OnInit } from '@angular/core';
import { ApiError } from '../../../types/error';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
  protected error?: ApiError;
  protected showDetails = false;

  constructor() {
    //const navigation = this.router.getCurrentNavigation();
    //this.error = navigation?.extras?.state?.['error']  
    this.error = history.state?.error
  }

  detailsToggle() {
    this.showDetails = !this.showDetails;
  }
}
