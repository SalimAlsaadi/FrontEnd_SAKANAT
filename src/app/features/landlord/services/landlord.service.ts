import { map, Observable, of } from 'rxjs';
// import { MOCK_FLATS } from '../data/mock-flats';
import { MOCK_ROOMS } from '../data/mock-rooms';
import { MOCK_HOUSES } from '../data/mock-houses';
import { MOCK_SHOPS } from '../data/mock-shops';

import { BuildingModel } from '../models/building.model';
import { RoomModel } from '../models/room.model';
import { HouseModel } from '../models/house.model';
import { ShopModel } from '../models/shop.model';
import { PropertyType } from '../models/property.model'
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '.../../environments/environment';
import { FlatListModel } from '../models/flatList.model'

@Injectable({
  providedIn: 'root'
})

export class LandlordPropertyService {

  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  /* =========================================================
   ADD NEW PROPERTY
   ========================================================= */

  createProperty(propertyType: PropertyType, data: any, pictures: File[]) {
    const formData = new FormData();

    formData.append('propertyType', propertyType);
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    );

    pictures.forEach(file => {
      formData.append('pictures', file);
    });

    return this.http.post(`${environment.apiBaseUrl}/api/buildings/createProperties`,
      formData, {
      withCredentials: true
    });
  }


  /* =========================================================
     BUILDING
  ========================================================= */


 getBuildings(): Observable<BuildingModel[]> {
  return this.http.post<BuildingModel[]>(
    `${environment.apiBaseUrl}/api/buildings/getAllBuildingByLandlordId`,
    {}
  );
}

getBuildingById(buildingId: number): Observable<BuildingModel> {
  return this.http.post<BuildingModel>(
    `${environment.apiBaseUrl}/api/buildings/getBuildingById`,
    { buildingId }
  );
}


  /* =========================================================
     FLATS
  ========================================================= */


getFlatListByBuildingId(buildingId: number): Observable<FlatListModel[]> {
  return this.http.post<FlatListModel[]>(
    `${environment.apiBaseUrl}/api/flats/getFlatsByBuildingId`,
    { buildingId }
  );
}

getFlatDetailsById(flatId: number): Observable<FlatListModel> {
  return this.http.post<FlatListModel>(
    `${environment.apiBaseUrl}/api/flats/getFlatById`,
    { flatId }
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
          house.rentTimeType === 'ROOMS'
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
          house.rentTimeType === 'WHOLE_HOUSE'
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

  // getTotalBuildingsCount(): Observable<number> {

  //   return of(MOCK_BUILDINGS.length);
  // }

  getTotalHousesCount(): Observable<number> {

    return of(MOCK_HOUSES.length);
  }

  getTotalRoomsCount(): Observable<number> {

    return of(MOCK_ROOMS.length);
  }

  // getTotalFlatsCount(): Observable<number> {

  //   return of(MOCK_FLATS.length);
  // }

  getTotalShopsCount(): Observable<number> {

    return of(MOCK_SHOPS.length);
  }
}