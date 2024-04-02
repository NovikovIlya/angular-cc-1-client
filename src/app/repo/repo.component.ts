import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

type infoType = {
  title: string
  description: string
  completed: boolean
  line: string
  people: string
  id: number
  priority:string,
}

@Component({
  selector: 'app-repo',
  standalone: true,
  imports: [ProgressSpinnerModule,CommonModule,DatePipe],
  templateUrl: './repo.component.html',
  styleUrl: './repo.component.scss',
})
export class RepoComponent {
  // data
  isLoading = true;
  info: infoType | null  = null;
  id: number = 1;

  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute
  ) {}

  // methods
  changeTask(){
    
  }
  fetchProducts(nameUser: any) {
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
   this.activateRoute.params.subscribe((params) => {
      //@ts-ignore
      this.fetchProducts(params.name); 
    });
  }
}
