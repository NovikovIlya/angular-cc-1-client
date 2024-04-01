import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [NgClass],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})




export class ThemeComponent {
  
  theme = "dark";
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }
}
