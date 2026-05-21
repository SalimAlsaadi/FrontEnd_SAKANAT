import { PropertyBase } from './property-base.model';

export interface BuildingModel extends PropertyBase {

  name: string;

  totalUnits: number;

  availableUnits: number;

  occupiedUnits: number;

  flatsCount: number;

  roomsCount: number;

  shopsCount: number;

  active: boolean;
}