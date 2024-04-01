import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService,
    private apiService: ApiService
  ) {}

  user: any = {};
  name: string | undefined = '';
  isLoading:boolean = true;

  fetchProducts(name: any) {
    this.isLoading = true;
    this.productsService
      .getProducts(`https://api.github.com/users/${name}`)
      .subscribe({
        next: (data: any) => {
          this.user = data;
          this.isLoading = false;
          console.log(this.user)
        },
        
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    
    this.apiService.getData().subscribe((name: string) => {
      this.name = name;
      this.fetchProducts(name);
    });
    // this.fetchProducts('ilya');
  }
}
