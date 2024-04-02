import { getState, patchState, signalStore, withMethods, withState } from '@ngrx/signals';
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
      patchState(store, (state) => ({ 
        ...state,
        filter: name 
       }));
    },
    setData(books:any){
      patchState(store, (state)=>({...state, books:books}))
    },
    deleteData(id:any){
      const state = getState(store);
      const filterBook = state.books.filter((item:any)=>item.id!==id)
      console.log('fitler,',filterBook)
      patchState(store, (state)=>({...state, books: filterBook}))
    }
    // async getData(){
    //   const books = await productsService.getProducts(`https://828af6af59952382.mokky.dev/all`);
    //   console.log(books)
    //   await patchState(store, { books });
    // }
  }))
);
