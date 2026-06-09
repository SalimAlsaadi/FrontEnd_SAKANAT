import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PropertyType } from '../../models/property.model';
import { LandlordPropertyService } from '../../services/landlord.service';
import { AuthService } from '../../../auth/auth.service';
import { MapPickerComponent } from '../../../shared/map-picker/map-picker';
import { BuildingModel } from '../../models/building.model'

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MapPickerComponent,
    MatOptionModule
  ],
  templateUrl: './add-property.html',
  styleUrls: ['./add-property.scss']
})


export class AddProperty implements OnDestroy{

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly propertyService = inject(LandlordPropertyService);
  private readonly authService = inject(AuthService);

  selectedType?: PropertyType;
  form: FormGroup = this.fb.group({});
  pictures: File[] = [];
  buildings: BuildingModel[] = [];
  loadingBuildings = false;


  propertyTypes = [
    {
      value: 'BUILDING' as PropertyType,
      label: 'Building',
      icon: 'apartment',
      description: 'Building with flats, rooms, and shops'
    },
    {
      value: 'FLAT' as PropertyType,
      label: 'Flat',
      icon: 'domain',
      description: 'Flat inside a building'
    },
    {
      value: 'HOME' as PropertyType,
      label: 'Home',
      icon: 'home',
      description: 'Standalone house or villa'
    },
    {
      value: 'ROOM' as PropertyType,
      label: 'Room',
      icon: 'meeting_room',
      description: 'Room inside flat or home'
    },
    {
      value: 'SHOP' as PropertyType,
      label: 'Shop',
      icon: 'storefront',
      description: 'Commercial unit'
    }
  ];

  tenantTypes = [
  { value: 'FAMILY', label: 'Family' },
  { value: 'INDIVIDUAL', label: 'Individual' },
  { value: 'EMPLOYEE', label: 'Employee' },
  { value: 'STUDENT', label: 'Student' }
];

rentTimeTypes = [
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' }
];

  ngOnInit(): void {
  this.loadBuildings();
}

  selectType(type: PropertyType): void {
    this.selectedType = type;
    this.pictures = [];
    this.buildForm(type);
  }

  getSelectedTypeIcon(): string {
    return this.propertyTypes.find(
      item => item.value === this.selectedType
    )?.icon ?? 'home_work';
  }

  buildForm(type: PropertyType): void {
    if (type === 'BUILDING') {
      this.form = this.fb.group({
        id: [null],
        buildingName: [''],
        region: [''],
        wilaya: [''],
        area: [''],
        numberOfFloors: [],
        hasParking: [false],
        hasGym: [false],
        hasSwimmingPool: [false],
        description: [''],
        latitude: [null],
        longitude: [null],
      });
      return;
    }

    if (type === 'FLAT') {
      this.form = this.fb.group({
        flatId: [null],
        flat_number: [''],
        numberOfRooms: [''],
        numberOfBathrooms: [''],
        hasLivingRoom: [false],
        rented: [false],
        floorNumber: [''],
        description: [''],
        tenantType: [null, Validators.required],
        rentTimeType: [null, Validators.required],
        price: [],
        mobileNumber: [''],
        buildingId: [null, Validators.required],
      });
      return;
    }

    if (type === 'HOME') {
      this.form = this.fb.group({
        id: [null],
        homeType: [''],
        numberOfRooms: [],
        numberOfBathrooms: [],
        hasLivingRoom: [false],
        furnished: [false],
        rented: [false],
        floorNumber: [],
        description: [''],
        region: [''],
        wilaya: [''],
        location: [''],
        latitude: [null],
        longitude: [null],
        tenantType: [null, Validators.required],
        rentTimeType: [null, Validators.required],
        price: [],
      });
      return;
    }

    if (type === 'ROOM') {
      this.form = this.fb.group({
        roomName: [''],
        size: [''],
        rented: [false],
        tenantType: [null, Validators.required],
        rentTimeType: [null, Validators.required],
        price: [],
        hasAC: [false],
        hasPrivateBathroom: [false],
        description: [''],
        flatId: [null],
        homeId: [null]
      });
      return;
    }

    if (type === 'SHOP') {
      this.form = this.fb.group({
        shopName: [''],
        shopNumber: [''],
        commercialType: [''],
        floorNumber: [''],
        rented: [false],
        description: [''],
        region: [''],
        wilaya: [''],
        price: [0],
        hasStorage: [false],
        hasParking: [false],
        hasBathroom: [false],
        hasInternet: [false],
        hasAC: [false],
        buildingId: [null],
      });
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pictures = Array.from(input.files ?? []);
  }

  removeImage(index: number): void {
    this.pictures.splice(index, 1);
    this.pictures = [...this.pictures];
  }

  submit(): void {
      console.log(this.form.getRawValue());

    if (!this.selectedType || this.form.invalid) {
      return;
    }

    this.propertyService
      .createProperty(
        this.selectedType,
        this.form.getRawValue(),
        this.pictures
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/landlord']);
        },
        error: err => console.error(err)
      });
  }

  cancel(): void {
    this.router.navigate(['/landlord']);
  }

  showMapModal = false;

openMapModal(): void {
  this.showMapModal = true;
  document.body.style.overflow = 'hidden';
}

closeMapModal(): void {
  this.showMapModal = false;
  document.body.style.overflow = '';
}

onLocationSelected(event: {
  latitude: number;
  longitude: number;
}): void {
  this.form.patchValue({
    latitude: event.latitude,
    longitude: event.longitude
  });

  this.form.get('latitude')?.markAsDirty();
  this.form.get('longitude')?.markAsDirty();

  this.closeMapModal();
}


loadBuildings(): void {
  this.loadingBuildings = true;

  this.propertyService.getBuildings().subscribe({
    next: (buildings) => {
      this.buildings = buildings ?? [];
      this.loadingBuildings = false;
    },
    error: (error) => {
      console.error('Failed to load buildings', error);
      this.buildings = [];
      this.loadingBuildings = false;
    }
  });
}


ngOnDestroy(): void {
  document.body.style.overflow = '';
}

}