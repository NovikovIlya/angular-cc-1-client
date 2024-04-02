import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ProductsService } from '../services/products.service';
import { inject } from '@angular/core';

type init = {
  books: any,
  isLoading:boolean,
  filter:string;
}
const initialState: init = {
  books: [],
  isLoading: false,
  filter: '1',
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, productsService = inject(ProductsService)) => ({
    updateQuery(name: string): void {
      patchState(store, (state) => ({ filter: name }));
    },
    setData(books:any){
      patchState(store, (state)=>({books:books}))
    }
    // async getData(){
    //   const books = await productsService.getProducts(`https://828af6af59952382.mokky.dev/all`);
    //   console.log(books)
    //   await patchState(store, { books });
    // }
  }))
);