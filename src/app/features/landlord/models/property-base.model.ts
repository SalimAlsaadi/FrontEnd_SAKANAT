import { LocationModel } from './location.model';

export interface PropertyBase extends LocationModel {

  id: number;

  description?: string;

  tenantType?: string;

  rentTimeType?: string;

  price?: number;

  rented?: boolean;

  pictureUrls?: string[];
}