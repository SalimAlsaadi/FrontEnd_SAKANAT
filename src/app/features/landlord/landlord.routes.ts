import { Routes } from '@angular/router';
import { LandlordDashboardComponent } from './pages/landlord-dashboard/landlord-dashboard.component';
import { BuildingsList } from './pages/buildings-list/buildings-list';
import { BuildingDetails } from './pages/building-details/building-details';
import { HousesList } from './pages/houses-list/houses-list';
import { HouseDetails } from './pages/house-details/house-details';
import { AddProperty } from './pages/add-property/add-property';

export const LANDLORD_ROUTES: Routes = [

  {
    path: 'addProperty',
    component: AddProperty
  },
  {
    path: '',
    component: LandlordDashboardComponent
  },
  {
    path: 'buildings',
    component: BuildingsList
  },
  {
    path: 'buildings/:id',
    component: BuildingDetails
  },
  {
    path: 'houses',
    component: HousesList
  },
  {
    path: 'houses/:id',
    component: HouseDetails
  },
  {
    path: 'flats/:id',
    loadComponent: () =>
      import('./pages/flat-details/flat-details')
        .then(m => m.FlatDetails)
  },

  {
    path: 'rooms/:id',
    loadComponent: () =>
      import('./pages/room-details/room-details')
        .then(m => m.RoomDetails)
  },

  {
    path: 'shops/:id',
    loadComponent: () =>
      import('./pages/shop-details/shop-details')
        .then(m => m.ShopDetails)
  },

];