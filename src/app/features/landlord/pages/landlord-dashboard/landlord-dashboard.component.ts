import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface LandlordDashboardCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-landlord-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landlord-dashboard.component.html',
  styleUrls: ['./landlord-dashboard.component.scss']
})
export class LandlordDashboardComponent {
  private readonly router = inject(Router);

  cards: LandlordDashboardCard[] = [
    {
      id: 1,
      title: 'Add New Hostel',
      description: 'Register a new hostel, building, villa, flat, or room.',
      icon: 'add_home',
      route: '/landlord/hostels/create'
    },
    {
      id: 2,
      title: 'Manage Hostels',
      description: 'View, update, publish, or disable your listed hostels.',
      icon: 'apartment',
      route: '/landlord/hostels'
    },
    {
      id: 3,
      title: 'Rooms & Units',
      description: 'Manage rooms, beds, prices, availability, and facilities.',
      icon: 'meeting_room',
      route: '/landlord/units'
    },
    {
      id: 4,
      title: 'Applications',
      description: 'Review tenant requests and approve or reject applications.',
      icon: 'assignment',
      route: '/landlord/applications'
    },
    {
      id: 5,
      title: 'Reports',
      description: 'Track occupancy, applications, revenue, and performance.',
      icon: 'bar_chart',
      route: '/landlord/reports'
    },
    {
      id: 6,
      title: 'Profile & Verification',
      description: 'Manage landlord information, documents, and verification.',
      icon: 'verified_user',
      route: '/landlord/profile'
    }
  ];

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  trackById(_: number, item: LandlordDashboardCard): number {
    return item.id;
  }
}