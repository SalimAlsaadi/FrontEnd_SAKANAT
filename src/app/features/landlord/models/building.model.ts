
export interface BuildingModel {
  id: number;
  buildingName: string;

  region: string;
  wilaya: string;
  area: string;

  flatsRented: number;
  flatsNotRented: number;

  roomsRented: number;
  roomsNotRented: number;

  shopsRented: number;
  shopsNotRented: number;

  numberOfFloors: number;

  hasParking: boolean;
  hasGym: boolean;
  hasSwimmingPool: boolean;

  description?: string;

  latitude?: number;
  longitude?: number;

  landlordName?: string;
  landLordMobileNumber?: string;

  pictureUrls: string[];
}