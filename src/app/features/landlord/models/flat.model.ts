
import { PropertyBase } from './property-base.model';

export interface FlatModel extends PropertyBase {

  buildingId: number;

  buildingName: string;

  numberOfRooms: number;

  numberOfBathrooms: number;

  hasLivingRoom: boolean;

  hasGYM: boolean;

  hasSwimmingPool: boolean;

  hasParking: boolean;
}

