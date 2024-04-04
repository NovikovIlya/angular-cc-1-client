import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OneTaskComponent } from './pages/one-task/one-task.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'task/:name',
    component: OneTaskComponent,
  }
];
