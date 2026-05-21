import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { BuildingModel }
from '../../models/building.model';

import { FlatModel }
from '../../models/flat.model';

import { RoomModel }
from '../../models/room.model';

import { ShopModel }
from '../../models/shop.model';

import { MOCK_BUILDINGS }
from '../../data/mock-buildings';

import { MOCK_FLATS }
from '../../data/mock-flats';

import { MOCK_ROOMS }
from '../../data/mock-rooms';

import { MOCK_SHOPS }
from '../../data/mock-shops';

type UnitTab =
  | 'FLATS'
  | 'ROOMS'
  | 'SHOPS';

@Component({
  selector: 'app-building-details',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './building-details.html',

  styleUrls: ['./building-details.scss']
})
export class BuildingDetails
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  building?: BuildingModel;

  flats: FlatModel[] = [];

  rooms: RoomModel[] = [];

  shops: ShopModel[] = [];

  selectedTab: UnitTab =
    'FLATS';

  ngOnInit(): void {

    const buildingId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBuilding(buildingId);

    this.loadFlats(buildingId);

    this.loadRooms(buildingId);

    this.loadShops(buildingId);
  }

  /* =====================================
     LOAD BUILDING
  ===================================== */

  private loadBuilding(
    buildingId: number
  ): void {

    this.building =
      MOCK_BUILDINGS.find(
        building =>
          building.id === buildingId
      );
  }

  /* =====================================
     LOAD FLATS
  ===================================== */

  private loadFlats(
    buildingId: number
  ): void {

    this.flats =
      MOCK_FLATS.filter(
        flat =>
          flat.buildingId === buildingId
      );
  }

  /* =====================================
     LOAD ROOMS
  ===================================== */

  private loadRooms(
    buildingId: number
  ): void {

    this.rooms =
      MOCK_ROOMS.filter(
        room =>
          room.sourceId === buildingId
      );
  }

  /* =====================================
     LOAD SHOPS
  ===================================== */

  private loadShops(
    buildingId: number
  ): void {

    this.shops =
      MOCK_SHOPS.filter(
        shop =>
          shop.buildingId === buildingId
      );
  }

  /* =====================================
     TABS
  ===================================== */

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