import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  standalone: true,
  selector: 'app-protected',
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  private oidc = inject(OidcSecurityService);
  private http = inject(HttpClient);

  isAuth = false;
  claims: any;
  accessToken?: string | null;
  idToken?: string | null;

  apiLoading = false;
  apiResult: any;
  apiError?: string;

  ngOnInit(): void {
    this.oidc.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuth = isAuthenticated;
    });

    this.oidc.userData$.subscribe(u => this.claims = u?.userData);
    this.oidc.getAccessToken().subscribe(t => this.accessToken = t);
    this.oidc.getIdToken().subscribe(t => this.idToken = t);
  }

  callApi(): void {
    this.apiError = undefined;
    this.apiLoading = true;
    this.http.get(`${environment.apiBaseUrl}/api/secure`).subscribe({
      next: res => { this.apiResult = res; this.apiLoading = false; },
      error: err => { this.apiError = err?.message || 'API error'; this.apiLoading = false; }
    });
  }
}
