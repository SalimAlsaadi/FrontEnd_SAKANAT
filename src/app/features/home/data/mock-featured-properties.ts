import { FeaturedProperty } from '../models/featured-property.model';

export const MOCK_FEATURED_PROPERTIES: FeaturedProperty[] = [
  {
    id: 1,
    title: 'Modern Apartment in Muscat',
    location: 'Muscat',
    price: 350,
    type: 'Apartment',
    imageUrl: 'https://via.placeholder.com/300x200',
    available: true
  },
  {
    id: 2,
    title: 'Luxury Villa in Al Khoud',
    location: 'Al Khoud',
    price: 1200,
    type: 'Villa',
    imageUrl: 'https://via.placeholder.com/300x200',
    available: true
  },
  {
    id: 3,
    title: 'Single Room in Sur',
    location: 'Sur',
    price: 120,
    type: 'Room',
    imageUrl: 'https://via.placeholder.com/300x200',
    available: false
  },
  {
    id: 4,
    title: 'Family Apartment in Seeb',
    location: 'Seeb',
    price: 400,
    type: 'Apartment',
    imageUrl: 'https://via.placeholder.com/300x200',
    available: true
  }
];