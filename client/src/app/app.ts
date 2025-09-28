import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private httpClient = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<any>(null);

  async ngOnInit() {
    this.members.set(await this.getMembers())
  }

  async getMembers() {
    try {
      return lastValueFrom(this.httpClient.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}

