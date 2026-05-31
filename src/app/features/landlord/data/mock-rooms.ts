
import { RoomModel } from '../models/room.model';

export const MOCK_ROOMS: RoomModel[] = [

  /* =========================================
     ROOMS FROM FLATS
  ========================================= */

  {
    id: 201,
    description: 'Private room inside Flat 101.',
    price: 90,
    isRented: false,
    tenantType: 'Family',
    rentalType: 'Monthly',
    region: 'Muscat',
    wilaya: 'Bawshar',
    location: 'Room 1 - Flat 101',
    latitude: 23.588,
    longitude: 58.382,
    fromFlat: true,
    sourceId: 101,
    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,
    pictureUrls: [ '/assets/images/flats1.jpg', '/assets/images/flats2.jpg' ]
  },

  {
    id: 202,
    description: 'Shared room inside Flat 101.',
    price: 70,
    isRented: true,
    tenantType: 'Indivilual',
    rentalType: 'Monthly',
    region: 'Muscat',
    wilaya: 'Bawshar',
    location: 'Room 2 - Flat 101',
    latitude: 23.588,
    longitude: 58.382,
    fromFlat: true,
    sourceId: 101,
    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,
    pictureUrls: [ '/assets/images/flats1.jpg'  ]
  },

  /* =========================================
     ROOMS FROM HOUSES
  ========================================= */

  {
    id: 301,
    description: 'Large furnished room in workers house.',
    price: 85,
    isRented: false,
    tenantType: 'Workers',
    rentalType: 'Monthly',
    region: 'South Al Sharqiyah',
    wilaya: 'Sur',
    location: 'Room A',
    latitude: 22.566,
    longitude: 59.528,
    fromFlat: false,
    sourceId: 1001,
    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,
    pictureUrls: [  '/assets/images/flats1.jpg' ]
  }

];