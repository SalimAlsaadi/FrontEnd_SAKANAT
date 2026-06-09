import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitDetailsLayout, UnitFeature} from '../unit-details-layout/unit-details-layout';
import { FlatListModel } from '../../models/flatList.model';
import { LandlordPropertyService } from '../../services/landlord.service';
import { UnitQuickActionType } from '../unit-details-layout/unit-details-layout';

@Component({
  selector: 'app-flat-details',
  standalone: true,
  imports: [
    CommonModule,
    UnitDetailsLayout
  ],
  templateUrl: './flat-details.html'
})
export class FlatDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly landlordService = inject(LandlordPropertyService);

  flat?: FlatListModel;

  flatFeatures: UnitFeature[] = [];

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const flatId = Number(this.route.snapshot.paramMap.get('id'));

    if (!flatId || Number.isNaN(flatId)) {
      this.errorMessage = 'Invalid flat id.';
      return;
    }

    this.loadFlatDetails(flatId);
  }

  private loadFlatDetails(flatId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.landlordService.getFlatDetailsById(flatId).subscribe({
      next: (flat) => {
        this.flat = flat;
        this.flatFeatures = this.buildFlatFeatures(flat);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load flat details', error);
        this.errorMessage = 'Failed to load flat details.';
        this.isLoading = false;
      }
    });
  }

  private buildFlatFeatures(flat: FlatListModel): UnitFeature[] {
    return [
      {
        label: 'Rooms',
        value: flat.numberOfRooms || '-',
        icon: 'bed'
      },
      {
        label: 'Bathrooms',
        value: flat.numberOfBathrooms || '-',
        icon: 'bathtub'
      },
      {
        label: 'Floor',
        value: flat.floorNumber || '-',
        icon: 'stairs'
      },
      {
        label: 'Living Room',
        value: flat.hasLivingRoom,
        icon: 'weekend',
        type: 'boolean'
      },
      {
        label: 'Parking',
        value: flat.hasParking,
        icon: 'local_parking',
        type: 'boolean'
      },
      {
        label: 'Swimming Pool',
        value: flat.hasSwimmingPool,
        icon: 'pool',
        type: 'boolean'
      },
      {
        label: 'GYM',
        value: flat.hasGym,
        icon: 'fitness_center',
        type: 'boolean'
      },
      {
        label: 'Tenant Type',
        value: flat.tenantType || '-',
        icon: 'group'
      },
      {
        label: 'Rent Type',
        value: flat.rentTimeType || '-',
        icon: 'calendar_month'
      },
      {
        label: 'Building',
        value: flat.buildingName || '-',
        icon: 'apartment'
      },
      {
        label: 'Landlord',
        value: flat.landlordName || '-',
        icon: 'person'
      },
      {
        label: 'Landlord Phone',
        value: flat.landlordPhoneNumber || '-',
        icon: 'call'
      }
    ];
  }

  handleFlatAction(action: UnitQuickActionType): void {
  if (!this.flat) {
    return;
  }

  switch (action) {
    case 'edit':
      // Navigate to edit flat page later
      console.log('Edit flat', this.flat.id);
      break;

    case 'contracts':
      console.log('Contracts section opened');
      break;

    case 'payments':
      console.log('Payments section opened');
      break;

    case 'maintenance':
      console.log('Maintenance section opened');
      break;

    case 'images':
      console.log('Upload images for flat', this.flat.id);
      break;

    case 'tenant':
      console.log('Add tenant to flat', this.flat.id);
      break;

    case 'delete':
      console.log('Delete flat', this.flat.id);
      break;

    default:
      break;
  }
}

  buildLocationDetails(): string {
    if (!this.flat) {
      return '';
    }

    return [
      this.flat.area,
      this.flat.wilaya,
      this.flat.region,
      this.flat.buildingName
    ]
      .filter(Boolean)
      .join(', ');
  }
}