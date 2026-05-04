import { ServiceCard } from '../models/service-card.model';

export const MOCK_SERVICE_CARDS: ServiceCard[] = [
  {
    id: 1,
    title: 'Browse Properties',
    description: 'Explore apartments, villas, rooms, and buildings across Oman.',
    icon: 'search',
    route: '/properties'
  },
  {
    id: 2,
    title: 'Rent Now',
    description: 'Quickly find and apply for available rental units.',
    icon: 'bolt',
    route: '/rent-now'
  },
  {
    id: 3,
    title: 'Smart Recommendations',
    description: 'Get personalized property suggestions.',
    icon: 'auto_awesome',
    route: '/smart'
  },
  {
    id: 4,
    title: 'Apartments',
    description: 'Browse apartments for individuals and families.',
    icon: 'apartment',
    route: '/properties/apartments'
  },
  {
    id: 5,
    title: 'Villas & Homes',
    description: 'Find villas and standalone homes.',
    icon: 'home',
    route: '/properties/villas'
  },
  {
    id: 6,
    title: 'Rooms & Shared',
    description: 'Affordable rooms and shared housing.',
    icon: 'meeting_room',
    route: '/properties/rooms'
  },
  {
    id: 7,
    title: 'For Landlords',
    description: 'Manage buildings and tenants.',
    icon: 'business',
    route: '/landlord'
  },
  {
    id: 8,
    title: 'My Applications',
    description: 'Track your rental requests.',
    icon: 'description',
    route: '/applications',
    requiresAuth: true
  },
  {
    id: 9,
    title: 'Saved Properties',
    description: 'View your favorite properties.',
    icon: 'favorite',
    route: '/favorites',
    requiresAuth: true
  },
  {
    id: 10,
    title: 'Support & Help',
    description: 'Get help and contact support.',
    icon: 'support_agent',
    route: '/support'
  }
];