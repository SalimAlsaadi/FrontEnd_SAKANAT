import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { environment } from 'environments/environment';
import { PKCE } from './pkce';


export type UserTypeCode = 'LANDLORD' | 'TENANT' | 'PUBLIC';

export interface UserProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  userType?: UserTypeCode[];
  roles?: string[];
  [key: string]: any;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser: boolean;

  private readonly sasUrl = environment.auth.authority;
  private readonly clientId = environment.auth.clientId;
  private readonly redirectUri = environment.auth.redirectUrl;
  private readonly postLogoutRedirectUri = environment.auth.postLogoutRedirectUri;
  private readonly apiBaseUrl = environment.apiBaseUrl;

  user = signal<UserProfile | null>(null);
  isLoggedIn = signal(false);
  loading = signal(false);

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  //login 
  async login(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      const codeVerifier = await PKCE.generateVerifier();
      const codeChallenge = await PKCE.generateChallenge(codeVerifier);

      sessionStorage.setItem('pkce_verifier', codeVerifier);

      const redirectAfterLogin = window.location.pathname || '/';
      sessionStorage.setItem('redirectAfterLogin', redirectAfterLogin);

      const authorizeUrl =
        `${this.sasUrl}/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${encodeURIComponent(this.clientId)}&` +
        `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
        `code_challenge=${encodeURIComponent(codeChallenge)}&` +
        `code_challenge_method=S256&` +
        `scope=${encodeURIComponent('openid profile email')}`;

      window.location.href = authorizeUrl;
    } catch (error) {
      console.error('Login initialization failed:', error);
      throw error;
    }
  }



  async handleCallback(code: string): Promise<boolean> {
    if (!this.isBrowser) return false;

    const verifier = sessionStorage.getItem('pkce_verifier');
    if (!verifier) {
      console.error('Missing PKCE verifier in sessionStorage.');
      return false;
    }

    try {
      const response = await fetch(`${this.sasUrl}/oauth2/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.clientId,
          code,
          redirect_uri: this.redirectUri,
          code_verifier: verifier
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token exchange failed:', errorText);
        return false;
      }

          const tokenData = await response.json();

    if (tokenData.id_token) {
      sessionStorage.setItem('id_token', tokenData.id_token);
    } 

      sessionStorage.removeItem('pkce_verifier');

      await this.loadUser();

      return true;
    } catch (error) {
      console.error('OAuth callback handling failed:', error);
      return false;
    }
  }



  async loadUser(): Promise<void> {
    if (!this.isBrowser) return;

    this.loading.set(true);

    try {
      const profile = await firstValueFrom(
       this.http.post<UserProfile>( `${this.apiBaseUrl}/api/users/getUser`, {}, { withCredentials: true } ));

      this.user.set(profile);
      this.isLoggedIn.set(true);
    } catch (error: any) {

  this.user.set(null);

  this.isLoggedIn.set(false);

  console.error(
    'Failed to load user',
    error
  );
}finally {
      this.loading.set(false);
    }
  }



  
  //logout
 logout(): void {
  if (!this.isBrowser) return;

  this.user.set(null);
  this.isLoggedIn.set(false);

  sessionStorage.removeItem('redirectAfterLogin');

  const idToken = sessionStorage.getItem('id_token');

  const params = new URLSearchParams({
    client_id: this.clientId,
    post_logout_redirect_uri: this.postLogoutRedirectUri
  });

  if (idToken) {
    params.set('id_token_hint', idToken);
  }

  sessionStorage.removeItem('id_token');
  sessionStorage.removeItem('pkce_verifier');


  window.location.href = `${this.sasUrl}/auth/logout?${params.toString()}`;
  }



  getRedirectAfterLogin(): string {
    if (!this.isBrowser) return '/';

    const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
    sessionStorage.removeItem('redirectAfterLogin');
    return redirectUrl;
  }


  /* =====================================
   SESSION EXPIRED
===================================== */

handleSessionExpired(): void {

  if (!this.isBrowser) return;

  console.warn(
    'Session expired. Logging out locally.'
  );

  /* CLEAR STATE */

  this.user.set(null);

  this.isLoggedIn.set(false);

  /* CLEAR STORAGE */

  sessionStorage.clear();

  localStorage.clear();

 }


  getUserDisplayName(): string {
    const currentUser = this.user();
    if (!currentUser) return '';

    return (
      currentUser.firstName ||
      currentUser.lastName ||
      'User'
    );
  }



  getUserInitial(): string {
    const name = this.getUserDisplayName();
    return name ? name.charAt(0).toUpperCase() : 'U';
  }


hasUserType(type: UserTypeCode): boolean {
  return this.user()?.userType?.includes(type) ?? false;
}

isLandlord(): boolean {
  return this.hasUserType('LANDLORD');
}

isTenant(): boolean {
  return this.hasUserType('TENANT');
}

isPublicUser(): boolean {
  return this.hasUserType('PUBLIC');
}

hasRole(role: string): boolean {
  return this.user()?.roles?.includes(role) ?? false;
}

isAdmin(): boolean {
  return this.hasRole('ROLE_AQARK_ADMIN');
}

}


