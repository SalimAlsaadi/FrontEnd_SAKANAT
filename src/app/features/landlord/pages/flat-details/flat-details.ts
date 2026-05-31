
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UnitDetailsLayout, UnitFeature} from '../unit-details-layout/unit-details-layout';

import { FlatModel } from '../../models/flat.model';
import { MOCK_FLATS } from '../../data/mock-flats';

@Component({
  selector: 'app-flat-details',
  standalone: true,
  imports: [
    CommonModule,
    UnitDetailsLayout
  ],
  templateUrl: './flat-details.html'
})
export class FlatDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);

  flat?: FlatModel;

  flatFeatures: UnitFeature[] = [];

  ngOnInit(): void {
    const flatId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.flat = MOCK_FLATS.find(
      flat => flat.id === flatId
    );

    if (this.flat) {
      this.flatFeatures = [
        {
          label: 'Rooms',
          value: this.flat.numberOfRooms,
          icon: 'bed'
        },
        {
          label: 'Bathrooms',
          value: this.flat.numberOfBathrooms,
          icon: 'bathtub'
        },
        {
          label: 'Living Room',
          value: this.flat.hasLivingRoom,
          icon: 'weekend',
          type: 'boolean'
        },
        {
          label: 'Parking',
          value: this.flat.hasParking,
          icon: 'local_parking',
          type: 'boolean'
        },
        {
          label: 'Swimming Pool',
          value: this.flat.hasSwimmingPool,
          icon: 'pool',
          type: 'boolean'
        },
        {
          label: 'GYM',
          value: this.flat.hasGYM,
          icon: 'fitness_center',
          type: 'boolean'
        }
      ];
    }
  }
}


// import { CommonModule } from '@angular/common';
// import { Component, computed, inject, OnInit, signal} from '@angular/core';
// import {ActivatedRoute,RouterLink} from '@angular/router';
// import { FlatModel }from '../../models/flat.model';
// import { MOCK_FLATS }from '../../data/mock-flats';
// import { Location } from '@angular/common';
// @Component({
//   selector: 'app-flat-details',
//   standalone: true,
//   imports: [ CommonModule, RouterLink],

//   templateUrl: './flat-details.html',

//   styleUrls: ['./flat-details.scss']
// })
// export class FlatDetails implements OnInit {

//   private readonly route = inject(ActivatedRoute);
//   private readonly location = inject(Location);

//   flat?: FlatModel;

//   currentImageIndex =
//     signal(0);

//   activeSection = signal< 'overview' | 'contracts' | 'payments' | 'maintenance' | 'analytics' > ('overview');

// currentImage =
//   computed(() => {

//     return this.flat?.pictureUrls?.[
//       this.currentImageIndex()
//     ] || '';

//   });

//    goBack(): void {
//     this.location.back();
//   }

//   prevImage(): void {
//   const totalImages = this.flat?.pictureUrls?.length ?? 0;

//   if (!totalImages) return;

//   this.currentImageIndex.update(index =>
//     index === 0
//       ? totalImages - 1
//       : index - 1
//   );
// }

//   ngOnInit(): void {

//     const flatId = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//     this.flat =
//       MOCK_FLATS.find(
//         flat => flat.id === flatId
//       );
//   }

//   /* =====================================
//      IMAGE SLIDER
//   ===================================== */

//   nextImage(): void {

//   const totalImages =
//     this.flat?.pictureUrls?.length ?? 0;

//   if (!totalImages) return;

//   this.currentImageIndex.update(index =>
//     index === totalImages - 1
//       ? 0
//       : index + 1
//   );
// }

//   /* =====================================
//      SECTIONS
//   ===================================== */

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