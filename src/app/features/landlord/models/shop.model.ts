import { PropertyBase } from './property-base.model';

export interface ShopModel extends PropertyBase {

  buildingId: number;

  shopNumber?: string;

  commercialType?: string;

  rented: boolean;

  hasStorage: boolean;

  hasParking: boolean;

hasBathroom: boolean;

hasInternet: boolean;

hasAC: boolean;
}