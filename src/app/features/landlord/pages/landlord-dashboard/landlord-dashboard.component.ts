import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

interface LandlordDashboardCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  route: string;
  action?: string;
}

@Component({
  selector: 'app-landlord-dashboard',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './landlord-dashboard.component.html',
  styleUrls: ['./landlord-dashboard.component.scss']
})
export class LandlordDashboardComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  cards: LandlordDashboardCard[] = [
   
  {
    id: 1,
    title: 'Add Property',
    description: 'Add a new building or house and define its rental structure.',
    icon: 'add_home',
    route: '/landlord/addProperty'  
  },
  {
    id: 2,
    title: 'Manage Buildings',
    description: 'View buildings and manage flats, rooms, and shops.',
    icon: 'apartment',
    route: '/landlord/buildings'
  },
  {
    id: 3,
    title: 'Manage Houses',
    description: 'View houses and manage whole-house or room rentals.',
    icon: 'home',
    route: '/landlord/houses'
  },
  {
    id: 4,
    title: 'Manage Units',
    description: 'Manage flats, rooms, shops, prices, and availability.',
    icon: 'meeting_room',
    route: '/landlord/units'
  },
  {
    id: 5,
    title: 'Applications',
    description: 'Review tenant requests and approve or reject applications.',
    icon: 'assignment',
    route: '/landlord/applications'
  },
  {
    id: 6,
    title: 'Reports',
    description: 'Track occupancy, applications, revenue, and performance.',
    icon: 'bar_chart',
    route: '/landlord/reports'
  }
];

    onCardClick(card: LandlordDashboardCard): void {
    
      if (card.route) {
        this.router.navigate([card.route]);
      }
    }



  trackById(_: number, item: LandlordDashboardCard): number {
    return item.id;
  }
}