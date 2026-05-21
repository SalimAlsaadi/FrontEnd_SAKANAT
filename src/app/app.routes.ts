import { Routes } from '@angular/router';
import { BrowserAuthGuard } from './guards/browser-auth.guard';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES)
  },

  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

{
  path: 'landlord',
  canActivate: [BrowserAuthGuard],
  loadChildren: () =>
    import('./features/landlord/landlord.routes')
      .then(m => m.LANDLORD_ROUTES)
},
  {
    path: 'callback',
    loadComponent: () => import('./features/auth/callback/callback.component').then(m => m.CallbackComponent)
  },

  {
    path: 'protected',
    canActivate: [BrowserAuthGuard],
    loadComponent: () => import('./features/auth/protected/protected.component').then(m => m.ProtectedComponent)
  },



  { path: '**', redirectTo: '' }
];
