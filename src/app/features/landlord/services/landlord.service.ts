import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MOCK_BUILDINGS } from '../data/mock-buildings';
import { MOCK_FLATS } from '../data/mock-flats';
import { MOCK_ROOMS } from '../data/mock-rooms';
import { MOCK_HOUSES } from '../data/mock-houses';
import { MOCK_SHOPS } from '../data/mock-shops';

import { BuildingModel } from '../models/building.model';
import { FlatModel } from '../models/flat.model';
import { RoomModel } from '../models/room.model';
import { HouseModel } from '../models/house.model';
import { ShopModel } from '../models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class LandlordPropertyService {

  /* =========================================================
     BUILDINGS
  ========================================================= */

  getBuildings(): Observable<BuildingModel[]> {

    return of(MOCK_BUILDINGS);
  }

  getBuildingById(
    id: number
  ): Observable<BuildingModel | undefined> {

    return of(
      MOCK_BUILDINGS.find(
        building => building.id === id
      )
    );
  }

  /* =========================================================
     FLATS
  ========================================================= */

  getFlats(): Observable<FlatModel[]> {

    return of(MOCK_FLATS);
  }

  getFlatsByBuildingId(
    buildingId: number
  ): Observable<FlatModel[]> {

    return of(
      MOCK_FLATS.filter(
        flat => flat.buildingId === buildingId
      )
    );
  }

  getFlatById(
    id: number
  ): Observable<FlatModel | undefined> {

    return of(
      MOCK_FLATS.find(
        flat => flat.id === id
      )
    );
  }

  /* =========================================================
     ROOMS
  ========================================================= */

  getRooms(): Observable<RoomModel[]> {

    return of(MOCK_ROOMS);
  }

  getRoomById(
    id: number
  ): Observable<RoomModel | undefined> {

    return of(
      MOCK_ROOMS.find(
        room => room.id === id
      )
    );
  }

  /*
    Rooms inside flat
  */
  getRoomsByFlatId(
    flatId: number
  ): Observable<RoomModel[]> {

    return of(
      MOCK_ROOMS.filter(
        room =>
          room.fromFlat &&
          room.sourceId === flatId
      )
    );
  }

  /*
    Rooms inside house
  */
  getRoomsByHouseId(
    houseId: number
  ): Observable<RoomModel[]> {

    return of(
      MOCK_ROOMS.filter(
        room =>
          !room.fromFlat &&
          room.sourceId === houseId
      )
    );
  }

  /* =========================================================
     HOUSES
  ========================================================= */

  getHouses(): Observable<HouseModel[]> {

    return of(MOCK_HOUSES);
  }

  getHouseById(
    id: number
  ): Observable<HouseModel | undefined> {

    return of(
      MOCK_HOUSES.find(
        house => house.id === id
      )
    );
  }

  /*
    Houses rented by rooms
  */
  getHousesByRoomsRental(): Observable<HouseModel[]> {

    return of(
      MOCK_HOUSES.filter(
        house =>
          house.rentType === 'ROOMS'
      )
    );
  }

  /*
    Whole houses
  */
  getWholeHouses(): Observable<HouseModel[]> {

    return of(
      MOCK_HOUSES.filter(
        house =>
          house.rentType === 'WHOLE_HOUSE'
      )
    );
  }

  /* =========================================================
     SHOPS
  ========================================================= */

  getShops(): Observable<ShopModel[]> {

    return of(MOCK_SHOPS);
  }

  getShopsByBuildingId(
    buildingId: number
  ): Observable<ShopModel[]> {

    return of(
      MOCK_SHOPS.filter(
        shop => shop.buildingId === buildingId
      )
    );
  }

  getShopById(
    id: number
  ): Observable<ShopModel | undefined> {

    return of(
      MOCK_SHOPS.find(
        shop => shop.id === id
      )
    );
  }

  /* =========================================================
     DASHBOARD STATS
  ========================================================= */

  getTotalBuildingsCount(): Observable<number> {

    return of(MOCK_BUILDINGS.length);
  }

  getTotalHousesCount(): Observable<number> {

    return of(MOCK_HOUSES.length);
  }

  getTotalRoomsCount(): Observable<number> {

    return of(MOCK_ROOMS.length);
  }

  getTotalFlatsCount(): Observable<number> {

    return of(MOCK_FLATS.length);
  }

  getTotalShopsCount(): Observable<number> {

    return of(MOCK_SHOPS.length);
  }
}