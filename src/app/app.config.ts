import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()), // good with SSR
    provideHttpClient(
      withFetch(),                 // NG02801: use fetch for SSR
      withInterceptorsFromDi()
    ),
    provideAuth({
      config: {
        authority: environment.auth.authority,
        clientId: environment.auth.clientId,
        redirectUrl: environment.auth.redirectUrl,
        postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
        scope: environment.auth.scope,
        responseType: environment.auth.responseType, 
        useRefreshToken: environment.auth.useRefreshToken,
        secureRoutes: [environment.apiBaseUrl],
        logLevel: LogLevel.Debug
      }
    })
  ]
};
