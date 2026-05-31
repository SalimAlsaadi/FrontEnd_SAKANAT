import {

  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse

} from '@angular/common/http';

import {
  Injectable
} from '@angular/core';

import {
  Observable,
  throwError
} from 'rxjs';

import {
  catchError
} from 'rxjs/operators';

import {
  AuthService
} from './features/auth/auth.service';

@Injectable()
export class AppInterceptor
implements HttpInterceptor {

  private sessionExpiredHandled =
    false;

  constructor(
    private readonly auth: AuthService
  ) {}

  intercept(

    req: HttpRequest<any>,

    next: HttpHandler

  ): Observable<HttpEvent<any>> {

    /* =====================================
       ADD CREDENTIALS
    ===================================== */

    const authReq = req.clone({

      withCredentials: true
    });

    return next.handle(authReq).pipe(

      catchError(

        (error: HttpErrorResponse) => {

          /* =====================================
             IGNORE AUTH ENDPOINTS
          ===================================== */

          const ignoredUrls = [

            '/oauth2/token',
            '/oauth2/authorize',
            '/auth/login',
            '/auth/logout'
          ];

          const shouldIgnore =
            ignoredUrls.some(url =>
              req.url.includes(url)
            );

          if (shouldIgnore) {

            return throwError(
              () => error
            );
          }

          /* =====================================
             SESSION EXPIRED
          ===================================== */

          if (

            (
              error.status === 401 ||
              error.status === 403
            ) &&

            !this.sessionExpiredHandled

          ) {

            this.sessionExpiredHandled =
              true;

            console.warn(
              'Session expired'
            );

            this.auth
              .handleSessionExpired();
          }

          return throwError(
            () => error
          );
        }
      )
    );
  }
}