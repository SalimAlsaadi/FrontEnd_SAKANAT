
import { PropertyBase } from './property-base.model';

export interface FlatModel extends PropertyBase {

  buildingId: number;
  flat_number: string;
  buildingName: string;

  numberOfRooms: number;
  numberOfBathrooms: number;

  hasLivingRoom: boolean;

  amenities: {
    parking: boolean;
    gym: boolean;
    swimmingPool: boolean;
  };
}

