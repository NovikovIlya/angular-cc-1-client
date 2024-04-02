import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


type init = {
  books: [],
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
  withMethods((store) => ({
    updateQuery(name: string): void {
      // 👇 Updating state using the `patchState` function.
      //@ts-ignore
      patchState(store, (state) => ({ filter: name }));
    },
  
  }))
);