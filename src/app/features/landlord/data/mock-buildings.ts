import { BuildingModel } from '../models/building.model';

export const MOCK_BUILDINGS: BuildingModel[] = [

  {
    id: 1,
    name: 'Al Noor Building',
    description: 'Luxury family building in Al Khuwair.',
    region: 'Muscat',
    wilaya: 'Bawshar',
    location: 'Al Khuwair',
    latitude: 23.5880,
    longitude: 58.3829,
    active: true,
    totalUnits: 12,
    availableUnits: 7,
    occupiedUnits: 5,
    flatsCount: 5,
    roomsCount: 4,
    shopsCount: 3,
    pictureUrls: [
      '/assets/images/building-1.jpg']
  },

  {
    id: 2,
    name: 'Al Malaki Building',
    description: 'Modern building with commercial shops.',
    region: 'Muscat',
    wilaya: 'Seeb',
    location: 'Al Hail',
    latitude: 23.6800,
    longitude: 58.1900,
    active: true,
    totalUnits: 9,
    availableUnits: 4,
    occupiedUnits: 5,
    flatsCount: 4,
    roomsCount: 2,
    shopsCount: 3,
    pictureUrls: ['/assets/images/building-2.jpg' ]
  },

  {
    id: 3,
    name: 'Jalaan Building',
    description: 'Modern building with commercial shops.',
    region: 'Muscat',
    wilaya: 'Seeb',
    location: 'Al Hail',
    latitude: 23.6800,
    longitude: 58.1900,
    active: true,
    totalUnits: 9,
    availableUnits: 4,
    occupiedUnits: 5,
    flatsCount: 4,
    roomsCount: 2,
    shopsCount: 3,
    pictureUrls: [ '/assets/images/building-3.jpg']
  },

  {
    id: 4,
    name: 'Muscat Building',
    description: 'Modern building with commercial shops.',
    region: 'Muscat',
    wilaya: 'Seeb',
    location: 'Al Hail',
    latitude: 23.6800,
    longitude: 58.1900,
    active: true,
    totalUnits: 9,
    availableUnits: 4,
    occupiedUnits: 5,
    flatsCount: 4,
    roomsCount: 2,
    shopsCount: 3,
    pictureUrls: [ '/assets/images/building-4.jpg']
  }

];