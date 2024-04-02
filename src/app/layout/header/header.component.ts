import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { BooksStore } from '../../store/items.store';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';


export type selectType = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DatePipe,
    InputTextareaModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  readonly store = inject(BooksStore);
  // data
  name: string = '';
  title: string = '';
  displayModal: boolean = false;
  description: string = '';
  date = null;
  priority = null;
  cities = [
    { name: 'Высокий', code: 'NY' },
    { name: 'Средний', code: 'RM' },
    { name: 'Низкий', code: 'TM' },
  ];
  selectedCity: selectType = { name: 'Высокий', code: '123' };

  // methods
  handleEvent(event: any) {
    console.log(event)
  }
  showModalDialog() {
    this.displayModal = true;
  }
  setData() {
    if (!this.name || !this.title || !this.description) {
      alert('Введите информацию');
      return;
    }
    this.sendText();
    this.displayModal = false;
  }

  sendText() {
    const datePipe = new DatePipe('en-EN')
    const formattedDate = datePipe.transform(this.date);
    const body = {
      title: this.title,
      description: this.description,
      completed: false,
      line: formattedDate,
      people: this.name,
      priority: this.selectedCity?.name,
    };

    this.http.post('https://828af6af59952382.mokky.dev/all', body).subscribe({
      next: (data) => {
        this.store.setData([data, ...this.store.books()]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
