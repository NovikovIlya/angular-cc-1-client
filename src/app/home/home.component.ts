import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';

import { CommonModule } from '@angular/common';

import { ApiService } from '../services/api.service';
import { BooksStore } from '../store/items.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly store = inject(BooksStore);

  user: any = {};
  name: string | undefined = '';
  isLoading: boolean = true;
  joinedDate = '';

  constructor(
    private productsService: ProductsService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getData().subscribe((name: string) => {
      this.name = name;
      this.fetchProducts(name);
    });
  }

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

  setStore() {
    this.store.updateQuery('zaza');
  }

  localDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
