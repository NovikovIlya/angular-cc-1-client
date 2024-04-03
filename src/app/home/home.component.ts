import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { BooksStore } from '../store/items.store';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from '../layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export type selectType = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputTextModule,
    CalendarModule,
    CommonModule,
    RouterModule,
    ProgressSpinnerModule,
    HeaderComponent,
    DropdownModule,
    FormsModule,
    DatePipe,
    ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly store = inject(BooksStore);
  // data
  user: any = {};
  name: any = '';
  isLoading: boolean = true;
  joinedDate = '';
  cities = [
    { name: 'Все', code: '' },
    { name: 'Высокий', code: 'high' },
    { name: 'Средний', code: 'middle' },
    { name: 'Низкий', code: 'low' },
  ];
  selectedCity = { name: '', code: null };

  status = [
    { name: 'Не выполнен', code: 'false' },
    { name: 'Выполнен', code: 'true' },
  ];
  selectedstatus = { name: 'Не выполнен', code: null };

  date = null;
  people = null;

  constructor(
    private productsService: ProductsService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
  }

  // lifecycle
  ngOnInit() {
    this.productsService
      .getProducts(`https://828af6af59952382.mokky.dev/all`)
      .subscribe({
        next: (books) => {
          this.isLoading = false;
          const bookReverse = books.toReversed();
          this.store.setData(bookReverse);
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
        },
      });
  }

  // methods
  search() {
    console.log(this.selectedCity);
    this.fetchProducts();
  }
  fetchProducts() {
    const datePipe = new DatePipe('en-EN')
    const formattedDate = datePipe.transform(this.date);
 
    this.isLoading = true;
    if(!this.selectedCity.code && !this.selectedstatus?.code  && !this.people && !formattedDate ){
      this.productsService
      .getProducts(
        `https://828af6af59952382.mokky.dev/all`
      )
      .subscribe({
        next: (data: any) => {
          this.user = data;
          this.isLoading = false;
          const bookReverse = data.toReversed();
          this.store.setData(bookReverse);

          // this.joinedDate = this.localDate.format(
          //   new Date(this.user.created_at)
          // );
        },
        error: (error) => {
          console.log(error);
        },
      });
      return
    }
    this.productsService
      .getProducts(
        `https://828af6af59952382.mokky.dev/all/?${this.selectedCity.code  ? `priority=`+this.selectedCity.code : ''}${this.selectedstatus.code ? `completed=`+this.selectedstatus.code:''}${formattedDate ? `&line=`+formattedDate : ''}${this.people ? `&people=`+this.people:''}`
      )
      .subscribe({
        next: (data: any) => {
          this.user = data;
          this.isLoading = false;
          const bookReverse = data.toReversed();
          this.store.setData(bookReverse);

          // this.joinedDate = this.localDate.format(
          //   new Date(this.user.created_at)
          // );
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteTask(id: any) {
    this.http.delete(`https://828af6af59952382.mokky.dev/all/${id}`).subscribe({
      next: (data) => {
        // this.store.setData([data, ...this.store.books()]);
        this.store.deleteData(id);
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  localDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
