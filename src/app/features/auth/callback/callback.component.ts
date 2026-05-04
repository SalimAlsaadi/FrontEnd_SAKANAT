import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `<p>Signing in...</p>`
})
export class CallbackComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.route.queryParams.subscribe(async params => {
      const code = params['code'];

      if (!code) {
       await this.router.navigateByUrl('/');
        return;
      }

      try {
        const success = await this.auth.handleCallback(code);

        if (!success) {
         await this.router.navigateByUrl('/');
          return;
        }


        const redirectUrl = this.auth.getRedirectAfterLogin();


       await this.router.navigateByUrl(redirectUrl);
      } catch (err) {
        console.error('OAuth callback failed', err);
        this.router.navigateByUrl('/');
      }
    });
  }


private resolvePostLoginRedirect(): string {
  const storedRedirect = this.auth.getRedirectAfterLogin();

  if (
    this.isSafeInternalRedirect(storedRedirect) &&
    storedRedirect !== '/' &&
    !storedRedirect.startsWith('/auth') &&
    !storedRedirect.startsWith('/callback')
  ) {
    return storedRedirect;
  }

  return '/';
}


  private isSafeInternalRedirect(url: string | null | undefined): boolean {
    if (!url) return false;

    if (!url.startsWith('/')) return false;

    if (url.startsWith('//')) return false;

    if (url.startsWith('/auth/login')) return false;

    if (url.startsWith('/callback')) return false;

    return true;
  }

}

