import { HouseModel } from '../models/house.model';

export const MOCK_HOUSES: HouseModel[] = [

  {
    id: 1000,
    homeType: 'Villa',
    numberOfRooms: 5,
    numberOfBathrooms: 4,
    hasLivingRoom: true,
    furnished: true,
    rented: false,
    floorNumber: 2,
    description: 'Luxury villa for family rent.',
    region: 'Muscat',
    wilaya: 'Seeb',
    location: 'Al Mawaleh',
    latitude: 23.665,
    longitude: 58.150,
    tenantType: 'Family',
    rentType: 'Monthly',
    price: 850,
    landlordName: 'Salim Al Saadi',
    landlordMobileNumber: '+96891234567',
    pictureUrls: ['/assets/houses/house-1.jpg' ]
  },

  {
    id: 1001,
    homeType: 'Workers House',
    numberOfRooms: 8,
    numberOfBathrooms: 4,
    hasLivingRoom: true,
    furnished: false,
    rented: true,
    floorNumber: 1,
    description: 'House rented by rooms for workers.',
    region: 'South Al Sharqiyah',
    wilaya: 'Sur',
    location: 'Industrial Area',
    latitude: 22.566,
    longitude: 59.528,
    tenantType: 'Workers',
    rentType: 'Monthly',
    price: 600,
    landlordName: 'Salim Al Saadi',
    landlordMobileNumber: '+96891234567',
    pictureUrls: [  '/assets/houses/house-2.jpg' ]
  },

{
    id: 1002,
    homeType: 'Workers House',
    numberOfRooms: 3,
    numberOfBathrooms: 2,
    hasLivingRoom: true,
    furnished: false,
    rented: false,
    floorNumber: 1,
    description: 'in centre city.',
    region: 'South Al Sharqiyah',
    wilaya: 'Sur',
    location: 'Industrial Area',
    latitude: 22.566,
    longitude: 59.528,
    tenantType: 'Workers',
    rentType: 'Monthly',
    price: 600,
    landlordName: 'Salim Al Saadi',
    landlordMobileNumber: '+96891234567',
    pictureUrls: [  '/assets/houses/house-2.jpg' ]
  }

];