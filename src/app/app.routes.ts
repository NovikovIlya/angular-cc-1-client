import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepoComponent } from './repo/repo.component';

// Your routing file should look like this
export const routes: Routes = [
  // A route to the home page (component)
  {
    path: '',
    component: HomeComponent,
  },
  // A route to the about us page (module)
  {
    path: 'repo/:name',
    component: RepoComponent,
  }
];
