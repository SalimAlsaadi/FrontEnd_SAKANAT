import { Routes } from '@angular/router';
import { PublicDashboardComponent } from './pages/public-dashboard/public-dashboard.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: PublicDashboardComponent
  }
];