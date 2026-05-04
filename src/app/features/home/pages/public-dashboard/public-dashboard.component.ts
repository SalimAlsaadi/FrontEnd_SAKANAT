import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { ServiceCard } from '../../models/service-card.model';
import { PropertyCategory } from '../../models/property-category.model';
import { FeaturedProperty } from '../../models/featured-property.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-public-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly router = inject(Router);

  readonly auth = inject(AuthService);

  serviceCards: ServiceCard[] = [];
  categories: PropertyCategory[] = [];
  featuredProperties: FeaturedProperty[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.homeService.getServiceCards().subscribe({
      next: (data) => {
        this.serviceCards = data;
      },
      error: (error) => {
        console.error('Error loading service cards:', error);
      }
    });

    this.homeService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    this.homeService.getFeaturedProperties().subscribe({
      next: (data) => {
        this.featuredProperties = data;
      },
      error: (error) => {
        console.error('Error loading featured properties:', error);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  trackById(_: number, item: { id: number }): number {
    return item.id;
  }
}


