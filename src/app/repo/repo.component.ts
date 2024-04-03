import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BooksStore } from '../store/items.store';

export type infoType = {
  title: string;
  description: string;
  completed: boolean;
  line: string;
  people: string;
  id: number;
  priority: string;
};
export type selectType = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-repo',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    DatePipe,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.scss',
})
export class RepoComponent {
  // data
  listStatus = [
    { name: 'Выполнен', code: true },
    { name: 'Не выполнен', code: false },
  ];
  status = { name: 'Не выполнен', code: true };
  isLoading = true;
  info: infoType | null = null;
  id: number = 1;
  name: string | undefined = '';
  title: string = 'test';
  displayModal: boolean = false;
  description: string = 'testDesc';
  date: any = '01.01.2023';
  priority = 'Высокий';
  cities = [
    { name: 'Высокий', code: 'NY' },
    { name: 'Средний', code: 'RM' },
    { name: 'Низкий', code: 'TM' },
  ];
  selectedCity: selectType = { name: 'Средний', code: 'RM' };

  readonly store = inject(BooksStore);
  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  // methods
  showModalDialog() {
    this.status = this.info?.completed
      ? { name: 'Выполнен', code: true }
      : { name: 'Не выполнен', code: false };
    this.displayModal = true;
    this.name = this.info?.people;
    this.title = this.info?.title || 'test';
    this.description = this.info?.description || 'test';
    this.date = new Date(this.info?.line || '2024-04-09T21:00:00.000Z');
    this.selectedCity = { name: this.info?.priority || 'Высокий', code: 'RM' };
  }

  setData(id: number) {
    if (!this.name || !this.title || !this.description) {
      alert('Введите информацию');
      return;
    }
    this.sendTextEdit(id);
    this.displayModal = false;
  }

  sendTextEdit(id: number) {
    const datePipe = new DatePipe('en-EN');
    const formattedDate = datePipe.transform(this.date);

    const body = {
      title: this.title,
      description: this.description,
      completed: this.status.code,
      line: formattedDate,
      people: this.name,
      priority: this.selectedCity?.name,
    };

    this.isLoading = true;
    this.http
      .patch(`https://828af6af59952382.mokky.dev/all/${id}`, body)
      .subscribe({
        next: (data: any) => {
          this.info = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  fetchProducts(nameUser: string) {
    this.isLoading = true;
    this.productsService
      .getProducts(`https://828af6af59952382.mokky.dev/all/${nameUser}`)
      .subscribe({
        next: (data: any) => {
          this.info = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    // Получение данных по конкретной тасук
    this.activateRoute.params.subscribe((params) => {
      this.fetchProducts(params['name']);
    });
  }
}
