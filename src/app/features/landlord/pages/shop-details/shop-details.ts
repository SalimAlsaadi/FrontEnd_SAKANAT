import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  UnitDetailsLayout,
  UnitFeature
} from '../unit-details-layout/unit-details-layout';

import { ShopModel } from '../../models/shop.model';
import { MOCK_SHOPS } from '../../data/mock-shops';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [  CommonModule, UnitDetailsLayout ],
  templateUrl: './shop-details.html'
})

export class ShopDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);

  shop?: ShopModel;

  shopFeatures: UnitFeature[] = [];

  ngOnInit(): void {
    const shopId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.shop = MOCK_SHOPS.find(
      shop => shop.id === shopId
    );

    if (this.shop) {
      this.shopFeatures = [
        {
          label: 'Commercial Type',
          value: this.shop.commercialType,
          icon: 'business_center'
        },
        {
          label: 'AC',
          value: this.shop.hasAC,
          icon: 'ac_unit',
          type: 'boolean'
        },
        {
          label: 'Internet',
          value: this.shop.hasInternet,
          icon: 'wifi',
          type: 'boolean'
        },
        {
          label: 'Parking',
          value: this.shop.hasParking,
          icon: 'local_parking',
          type: 'boolean'
        },
        {
          label: 'Storage',
          value: this.shop.hasStorage,
          icon: 'inventory_2',
          type: 'boolean'
        },
        {
          label: 'Bathroom',
          value: this.shop.hasBathroom,
          icon: 'wc',
          type: 'boolean'
        }
      ];
    }
  }
}



// import { CommonModule, Location } from '@angular/common';

// import {
//   Component,
//   computed,
//   inject,
//   OnInit,
//   signal
// } from '@angular/core';

// import {
//   ActivatedRoute,
//   RouterLink
// } from '@angular/router';

// import { ShopModel } from '../../models/shop.model';
// import { MOCK_SHOPS } from '../../data/mock-shops';

// @Component({
//   selector: 'app-shop-details',

//   standalone: true,

//   imports: [
//     CommonModule,
//     RouterLink
//   ],

//   templateUrl: './shop-details.html',

//   styleUrls: [
//     '../flat-details/flat-details.scss'
//   ]
// })
// export class ShopDetails implements OnInit {

//   private readonly route = inject(ActivatedRoute);
//   private readonly location = inject(Location);

//   shop?: ShopModel;

//   currentImageIndex = signal(0);

//   activeSection = signal<
//     'overview' |
//     'contracts' |
//     'payments' |
//     'maintenance' |
//     'analytics'
//   >('overview');

//   currentImage = computed(() => {

//     return this.shop?.pictureUrls?.[
//       this.currentImageIndex()
//     ] || '';

//   });

//   ngOnInit(): void {

//     const shopId = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//     this.shop = MOCK_SHOPS.find(
//       shop => shop.id === shopId
//     );
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   prevImage(): void {

//     const totalImages =
//       this.shop?.pictureUrls?.length ?? 0;

//     if (!totalImages) return;

//     this.currentImageIndex.update(index =>
//       index === 0
//         ? totalImages - 1
//         : index - 1
//     );
//   }

//   nextImage(): void {

//     const totalImages =
//       this.shop?.pictureUrls?.length ?? 0;

//     if (!totalImages) return;

//     this.currentImageIndex.update(index =>
//       index === totalImages - 1
//         ? 0
//         : index + 1
//     );
//   }

//   setSection(
//     section:
//       'overview' |
//       'contracts' |
//       'payments' |
//       'maintenance' |
//       'analytics'
//   ): void {

//     this.activeSection.set(section);
//   }
// }