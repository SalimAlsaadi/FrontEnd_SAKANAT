import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class BrowserAuthGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate() {
    return this.http.get(`${environment.apiBaseUrl}/api/me`, {
      withCredentials: true
    }).pipe(

      map(() => true),

      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
