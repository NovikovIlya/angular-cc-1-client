import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { BooksStore } from '../../store/items.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  readonly store = inject(BooksStore);
  // data
  name: string = '';
  title:string = '';

  // methods
  setData() {
    this.sendText();
  }

  sendText() {
    const body = {
      title: this.title,
      description: 'Hello, world!',
      completed: false,
      line: '20.01.2024',
      people: this.name,
    };

    this.http.post('https://828af6af59952382.mokky.dev/all', body).subscribe({
      next: (data) => {
        this.store.setData([...this.store.books(), data]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
