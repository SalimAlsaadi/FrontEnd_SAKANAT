import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/layout/header/header.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  private oidc = inject(OidcSecurityService);
  private platformId = inject(PLATFORM_ID);

  protected readonly title = signal('Salim');

  ngOnInit(): void {
    // Avoid "Storage was undefined" on SSR
    if (isPlatformBrowser(this.platformId)) {
      this.oidc.checkAuth().subscribe();
    }
  }
}
