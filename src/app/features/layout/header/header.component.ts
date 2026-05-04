import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface NavItem {
  label: string;
  route: string;
  show: boolean;
}

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly user = this.auth.user;
  readonly isLoggedIn = this.auth.isLoggedIn;
  readonly loading = this.auth.loading;

  readonly mobileMenuOpen = signal(false);

  readonly navItems = computed<NavItem[]>(() => [
    {
      label: 'Home',
      route: '/',
      show: true
    },
    {
      label: 'Properties',
      route: '/properties',
      show: true
    },
    {
      label: 'Rent Now',
      route: '/rent-now',
      show: true
    },
    {
      label: 'Landlord Dashboard',
      route: '/landlord',
      show: this.auth.isLandlord()
    },
    {
      label: 'Admin Dashboard',
      route: '/admin',
      show: this.auth.isAdmin()
    },
    {
      label: 'Support',
      route: '/support',
      show: true
    }
  ].filter(item => item.show));

  constructor() {
    if (this.isBrowser) {
      this.auth.loadUser();
    }
  }

  login(): void {
    this.closeMobileMenu();
    this.auth.login();
  }

  logout(): void {
    this.closeMobileMenu();
    this.auth.logout();
  }

  goHome(): void {
    this.router.navigateByUrl('/');
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  getUserDisplayName(): string {
    return this.auth.getUserDisplayName();
  }

  getUserInitial(): string {
    return this.auth.getUserInitial();
  }

  trackByRoute(_: number, item: NavItem): string {
    return item.route;
  }
}