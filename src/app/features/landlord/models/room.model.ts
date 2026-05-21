import { PropertyBase } from './property-base.model';

export interface RoomModel extends PropertyBase {

  isRented: boolean;

  rentalType: string;

  fromFlat: boolean;

  sourceId: number;

  floorNumber?: number;

  hasAC: boolean;

  hasWifi: boolean;

  hasPrivateBathroom: boolean;

  hasKitchenAccess: boolean;

  isFurnished: boolean;
}