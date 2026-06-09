import { PropertyBase } from './property-base.model';

export interface RoomModel extends PropertyBase {



  fromFlat: boolean;

  sourceId: number;

  floorNumber?: number;

  hasAC: boolean;

  hasWifi: boolean;

  hasPrivateBathroom: boolean;

  hasKitchenAccess: boolean;

  isFurnished: boolean;
}