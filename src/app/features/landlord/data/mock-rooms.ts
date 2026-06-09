import { RoomModel } from '../models/room.model';

export const MOCK_ROOMS: RoomModel[] = [
  {
    id: 201,
    description: 'Private room inside Flat 101.',
    price: 90,
    rented: false,
    tenantType: 'Family',
    rentTimeType: 'Monthly',

    region: 'Muscat',
    wilaya: 'Bawshar',
    locationLabel: 'Room 1 - Flat 101',
    latitude: 23.588,
    longitude: 58.382,

    active: true,
    fromFlat: true,
    sourceId: 101,

    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,

    pictureUrls: ['/assets/images/flats1.jpg', '/assets/images/flats2.jpg']
  },

  {
    id: 202,
    description: 'Shared room inside Flat 101.',
    price: 70,
    rented: true,
    tenantType: 'Individual',
    rentTimeType: 'Monthly',

    region: 'Muscat',
    wilaya: 'Bawshar',
    locationLabel: 'Room 2 - Flat 101',
    latitude: 23.588,
    longitude: 58.382,

    active: true,
    fromFlat: true,
    sourceId: 101,

    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,

    pictureUrls: ['/assets/images/flats1.jpg']
  },

  {
    id: 301,
    description: 'Large furnished room in workers house.',
    price: 85,
    rented: false,
    tenantType: 'Workers',
    rentTimeType: 'Monthly',

    region: 'South Al Sharqiyah',
    wilaya: 'Sur',
    locationLabel: 'Room A',
    latitude: 22.566,
    longitude: 59.528,

    active: true,
    fromFlat: false,
    sourceId: 1001,

    hasAC: true,
    hasWifi: true,
    hasPrivateBathroom: true,
    hasKitchenAccess: false,
    isFurnished: false,

    pictureUrls: ['/assets/images/flats1.jpg']
  }
];