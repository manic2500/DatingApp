import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggleComponent implements OnInit {
  //theme: 'light' | 'dark' | 'system' = 'light';
  theme = signal<'light' | 'dark' | 'system'>('system')

  ngOnInit() {
    // Read stored theme or system preference on load
    const stored = localStorage.getItem('theme');
    if (stored === 'system' || !stored) {
      this.setTheme('system');
    } else {
      this.setTheme(stored as 'light' | 'dark');
    }
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.theme.set(theme);

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }
}


/* 

Case:1
onload - Check stored theme preference in localstore
if present and if is 'system' then find out what is the current system settings
if not present, default to light

Case:2
onload - 
if present and if is 'dark | light' set the theme signal respectively from local storage


*/