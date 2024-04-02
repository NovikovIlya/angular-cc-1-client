import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { BooksStore } from '../store/items.store';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent } from '../layout/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule,ProgressSpinnerModule,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly store = inject(BooksStore);
  // data
  user: any = {};
  name: string | undefined = '';
  isLoading: boolean = true;
  joinedDate = '';

  constructor(
    private productsService: ProductsService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}
   
  // lifecycle
  ngOnInit() {
    this.apiService.getData().subscribe((name: string) => {
      this.name = name;
      this.fetchProducts(name);
    });

    this.productsService.getProducts('https://828af6af59952382.mokky.dev/all')
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
  fetchProducts(name: string) {
    this.isLoading = true;
    this.productsService
      .getProducts(`https://api.github.com/users/${name}`)
      .subscribe({
        next: (data: any) => {
          this.user = data;
          this.isLoading = false;
          this.joinedDate = this.localDate.format(
            new Date(this.user.created_at)
          );
          console.log(this.user);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  
  deleteTask(id:any){
    this.http.delete(`https://828af6af59952382.mokky.dev/all/${id}`).subscribe({
      next: (data) => {
        // this.store.setData([data, ...this.store.books()]);
        this.store.deleteData(id)
        console.log(data)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // setStore() {
  //   this.store.getData();
  // }

  localDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
