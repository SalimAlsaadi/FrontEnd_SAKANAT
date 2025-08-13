// callback.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, take } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-callback',
  template: `<p>Signing you in…</p>`
})
export class CallbackComponent implements OnInit {
  private oidc = inject(OidcSecurityService);
  private router = inject(Router);

  ngOnInit(): void {
    this.oidc.isAuthenticated$
      .pipe(
        filter(r => r.isAuthenticated),
        take(1)
      )
      .subscribe(() => this.router.navigateByUrl('/protected'));
  }
}
