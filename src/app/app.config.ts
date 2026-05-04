import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
};
