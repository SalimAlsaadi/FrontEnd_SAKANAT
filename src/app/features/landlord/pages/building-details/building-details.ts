import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

import { BuildingModel } from '../../models/building.model';
import { FlatModel } from '../../models/flat.model';
import { RoomModel } from '../../models/room.model';
import { ShopModel } from '../../models/shop.model';

import { MOCK_BUILDINGS } from '../../data/mock-buildings';
import { MOCK_FLATS } from '../../data/mock-flats';
import { MOCK_ROOMS } from '../../data/mock-rooms';
import { MOCK_SHOPS } from '../../data/mock-shops';

type UnitTab = 'FLATS' | 'ROOMS' | 'SHOPS';
type BuildingModule =
  | 'UNITS'
  | 'SERVICES'
  | 'CONTRACTS'
  | 'FINANCE'
  | 'REPORTS'
  | 'MAINTENANCE'
  | 'ALERTS';


@Component({
  selector: 'app-building-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './building-details.html',
  styleUrls: ['./building-details.scss']
})
export class BuildingDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

goBack(): void {
  this.location.back();
}

  building?: BuildingModel;

  flats: FlatModel[] = [];
  rooms: RoomModel[] = [];
  shops: ShopModel[] = [];

  selectedTab: UnitTab = 'FLATS';


  selectedModule: BuildingModule = 'UNITS';

buildingModules = [
  {
    key: 'UNITS' as BuildingModule,
    title: 'Units Management',
    subtitle: 'Flats, rooms, shops',
    icon: 'domain',
    badge: 'Default'
  },
  {
    key: 'CONTRACTS' as BuildingModule,
    title: 'Contracts',
    subtitle: 'Leases and renewals',
    icon: 'contract',
    badge: 'Active'
  },
  {
    key: 'FINANCE' as BuildingModule,
    title: 'Finance',
    subtitle: 'Rent and payments',
    icon: 'payments',
    badge: 'OMR'
  },
  {
    key: 'REPORTS' as BuildingModule,
    title: 'Reports',
    subtitle: 'Monthly reports',
    icon: 'bar_chart',
    badge: 'PDF'
  },
  {
    key: 'MAINTENANCE' as BuildingModule,
    title: 'Maintenance',
    subtitle: 'Issues and requests',
    icon: 'construction',
    badge: '5'
  },
  {
    key: 'ALERTS' as BuildingModule,
    title: 'Alerts',
    subtitle: 'Late payments',
    icon: 'notifications_active',
    badge: '3'
  }

];

selectModule(module: BuildingModule): void {
  this.selectedModule = module;
}


  ngOnInit(): void {
    const buildingId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadBuilding(buildingId);
    this.loadFlats(buildingId);
    this.loadRoomsFromBuildingFlats(buildingId);
    this.loadShops(buildingId);
  }

  get availableFlatsCount(): number {
    return this.flats.filter(flat => !flat.rented).length;
  }

  get occupiedFlatsCount(): number {
    return this.flats.filter(flat => flat.rented).length;
  }

  get availableRoomsCount(): number {
    return this.rooms.filter(room => !room.isRented).length;
  }

  get occupiedRoomsCount(): number {
    return this.rooms.filter(room => room.isRented).length;
  }

  get availableShopsCount(): number {
    return this.shops.filter(shop => !shop.rented).length;
  }

  get occupiedShopsCount(): number {
    return this.shops.filter(shop => shop.rented).length;
  }

  get averageFlatPrice(): number {
    return this.calculateAverage(this.flats.map(flat => flat.price || 0));
  }

  get averageRoomPrice(): number {
    return this.calculateAverage(this.rooms.map(room => room.price || 0));
  }

  get averageShopPrice(): number {
    return this.calculateAverage(this.shops.map(shop => shop.price || 0));
  }

  private loadBuilding(buildingId: number): void {
    this.building = MOCK_BUILDINGS.find(building => building.id === buildingId);
  }

  private loadFlats(buildingId: number): void {
    this.flats = MOCK_FLATS.filter(flat => flat.buildingId === buildingId);
  }

  private loadRoomsFromBuildingFlats(buildingId: number): void {
    const flatIds = MOCK_FLATS
      .filter(flat => flat.buildingId === buildingId)
      .map(flat => flat.id);

    this.rooms = MOCK_ROOMS.filter(room => flatIds.includes(room.sourceId));
  }

  private loadShops(buildingId: number): void {
    this.shops = MOCK_SHOPS.filter(shop => shop.buildingId === buildingId);
  }

  private calculateAverage(values: number[]): number {
    const validValues = values.filter(value => value > 0);

    if (!validValues.length) {
      return 0;
    }

    const total = validValues.reduce((sum, value) => sum + value, 0);
    return Math.round(total / validValues.length);
  }

  showFlats(): void {
    this.selectedTab = 'FLATS';
  }

  showRooms(): void {
    this.selectedTab = 'ROOMS';
  }

  showShops(): void {
    this.selectedTab = 'SHOPS';
  }

}