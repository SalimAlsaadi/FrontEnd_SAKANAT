import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withFetch,withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';
import { environment } from './environments/environment';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth({
      config: {
        authority: environment.auth.authority,
        clientId: environment.auth.clientId,
        redirectUrl: environment.auth.redirectUrl,
        postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
        scope: environment.auth.scope,
        responseType: environment.auth.responseType,
        useRefreshToken: environment.auth.useRefreshToken,
        secureRoutes: [environment.apiBaseUrl],  // auto-attach tokens to these calls
        logLevel: LogLevel.Debug                 // dev only
      }
    })
  ]
}).catch((err) => console.error(err));