import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component';
import { ProtectedComponent } from './protected/protected.component';
import { CallbackComponent } from './callback/callback.component';

export const AUTH_ROUTES: Routes = [

   { path: 'register', component: RegisterComponent },
  {  path: 'login', component: LoginComponent  },
  {  path: 'protected', component: ProtectedComponent  },
  {  path: 'callback', component: CallbackComponent  }
];