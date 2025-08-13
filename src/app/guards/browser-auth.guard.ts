import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const browserCanActivate: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  return isPlatformBrowser(platformId)
    ? inject(AutoLoginPartialRoutesGuard).canActivate(route, state) // run real guard in browser
    : true;                                                         // skip guard during SSR
};
