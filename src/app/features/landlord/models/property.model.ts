

export type PropertyType = 'BUILDING' | 'HOUSE';

export type RentalMode = 'WHOLE_PROPERTY' | 'BY_UNITS';

export interface Property {
  id: number;
  landlordId: number;
  name: string;
  type: PropertyType;
  rentalMode: RentalMode;
  governorate: string;
  wilayat: string;
  area: string;
  address: string;
  description: string;
  imageUrl?: string;
  active: boolean;
  totalUnits: number;
  availableUnits: number;
  occupiedUnits: number;
}