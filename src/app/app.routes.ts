import { Routes } from '@angular/router';
import { browserCanActivate } from './guards/browser-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'protected', pathMatch: 'full' },

  {
    path: 'callback', // must be UNGUARDED
    loadComponent: () =>
      import('./features/auth/callback/callback.component').then(m => m.CallbackComponent),
  },

  {
    path: 'protected',
    canActivate: [browserCanActivate], // ✅ use the wrapper
    loadComponent: () =>
      import('./features/auth/protected/protected.component').then(m => m.ProtectedComponent),
  },

  { path: '**', redirectTo: '' },
];
