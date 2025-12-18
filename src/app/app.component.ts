import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <div class="header">
        <h1>Task Manager</h1>
        <nav class="controls">
          <a routerLink="/tasks">Tasks</a>
          <a routerLink="/tasks/new">New Task</a>
          <button (click)="toggleTheme()" aria-label="Toggle theme">
            {{ theme === 'light' ? '🌙 Dark' : '☀️ Light' }}
          </button>
        </nav>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.theme = saved === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(this.theme === 'light' ? 'theme-light' : 'theme-dark');
  }
}
