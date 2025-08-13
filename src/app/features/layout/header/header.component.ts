// src/app/features/layout/header/header.component.ts
import { Component, computed, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

type Claims = { name?: string; preferred_username?: string; email?: string; [k: string]: unknown };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private oidc = this.isBrowser ? inject(OidcSecurityService) : null;

  isAuthenticated = toSignal(
    this.isBrowser
      ? this.oidc!.isAuthenticated$.pipe(map(r => r.isAuthenticated))
      : of(false),
    { initialValue: false }
  );

  userClaims = toSignal(
    this.isBrowser
      ? this.oidc!.userData$.pipe(map((v: any) => (v?.userData ?? v ?? null) as Claims | null))
      : of(null),
    { initialValue: null as Claims | null }
  );

  displayName = computed(() => {
    const c = this.userClaims();
    return c?.name ?? c?.preferred_username ?? c?.email ?? 'User';
  });

  login()  { if (this.isBrowser) this.oidc!.authorize(); }
  logout() { if (this.isBrowser) this.oidc!.logoff(); }
}
