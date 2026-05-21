import { PropertyBase } from './property-base.model';

export interface HouseModel extends PropertyBase {

  homeType: string;

  numberOfRooms: number;

  numberOfBathrooms: number;

  hasLivingRoom: boolean;

  furnished: boolean;

  rented: boolean;

  floorNumber?: number;

  landlordName?: string;

  landlordMobileNumber?: string;
}