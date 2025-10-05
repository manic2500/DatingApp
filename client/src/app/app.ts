import { Component, inject, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { Router, RouterOutlet } from '@angular/router';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { LoadingService } from '../core/services/loading-service';


@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, ToastNoAnimationModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private loadingService = inject(LoadingService);
  loading = this.loadingService.loading;

  protected router = inject(Router)

  protected readonly title = signal('Dating App');


  protected get containerClasses() {
    return this.router.url !== '/' ? 'mt-24 container mx-auto' : '';
  }


}

/* 

async ngOnInit() {
    //this.setCurrentUser()
    this.members.set(await this.getMembers() as User[])
  }

  
  async getMembers() {
    try {
      return lastValueFrom(this.httpClient.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
*/
