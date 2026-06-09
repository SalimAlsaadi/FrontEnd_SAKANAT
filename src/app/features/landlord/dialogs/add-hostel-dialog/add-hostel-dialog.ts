import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PropertyType } from '../../models/property.model';
import { LandlordPropertyService } from '../../services/landlord.service';

@Component({
  selector: 'app-add-hostel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './add-hostel-dialog.html',
  styleUrls: ['./add-hostel-dialog.scss']
})
export class AddHostelDialogComponent {

  private readonly fb = inject(FormBuilder);
  private readonly propertyService = inject(LandlordPropertyService);
  private readonly dialogRef =
    inject(MatDialogRef<AddHostelDialogComponent>);

  selectedType?: PropertyType;
  pictures: File[] = [];

  form: FormGroup = this.fb.group({});

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
      description: 'Apartment inside a building'
    },
    {
      value: 'ROOM' as PropertyType,
      label: 'Room',
      icon: 'meeting_room',
      description: 'Room inside flat or home'
    },
    {
      value: 'HOME' as PropertyType,
      label: 'Home',
      icon: 'home',
      description: 'Standalone house or villa'
    },
    {
      value: 'SHOP' as PropertyType,
      label: 'Shop',
      icon: 'storefront',
      description: 'Commercial unit'
    }
  ];

  selectType(type: PropertyType): void {
    this.selectedType = type;
    this.buildForm(type);
  }

  getSelectedTypeIcon(): string {
  return this.propertyTypes.find(
    type => type.value === this.selectedType
  )?.icon ?? 'home_work';
}

  resetType(): void {
    this.selectedType = undefined;
    this.pictures = [];
    this.form = this.fb.group({});
  }

  buildForm(type: PropertyType): void {
  if (type === 'BUILDING') {
    this.form = this.fb.group({
      id: [null],
      buildingName: [''],
      region: [''],
      wilaya: [''],
      totalFlats: [0],
      flatsRented: [0],
      flatsNotRented: [0],
      numberOfFloors: [0],
      hasParking: [false],
      hasGym: [false],
      hasSwimmingPool: [false],
      description: [''],
      latitude: [null],
      longitude: [null],
      landlordId: [1]
    });
    return;
  }

  if (type === 'FLAT') {
    this.form = this.fb.group({
      flatId: [null],
      numberOfRooms: [''],
      numberOfBathrooms: [''],
      hasLivingRoom: [false],
      rented: [false],
      floorNumber: [''],
      description: [''],
      region: [''],
      wilaya: [''],
      tenantType: [''],
      rentTimeType: [''],
      price: [0],
      mobileNumber: [''],
      landlordId: [1],
      buildingId: [null],
      latitude: [null],
      longitude: [null]
    });
    return;
  }

  if (type === 'HOME') {
    this.form = this.fb.group({
      id: [null],
      homeType: [''],
      numberOfRooms: [0],
      numberOfBathrooms: [0],
      hasLivingRoom: [false],
      furnished: [false],
      rented: [false],
      floorNumber: [0],
      description: [''],
      region: [''],
      wilaya: [''],
      location: [''],
      latitude: [null],
      longitude: [null],
      tenantType: [''],
      rentType: [''],
      price: [0],
      landlordId: [1]
    });
    return;
  }

  if (type === 'ROOM') {
    this.form = this.fb.group({
      roomName: [''],
      size: [''],
      rented: [false],
      tenantType: [''],
      rentalType: [''],
      price: [0],
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
      location: [''],
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
      landlordId: [1],
      latitude: [null],
      longitude: [null]
    });
  }
}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pictures = Array.from(input.files ?? []);
  }

  submit(): void {
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
        next: result => this.dialogRef.close(result),
        error: err => console.error(err)
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}