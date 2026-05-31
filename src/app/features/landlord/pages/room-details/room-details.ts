import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitDetailsLayout, UnitFeature} from '../unit-details-layout/unit-details-layout';
import { RoomModel } from '../../models/room.model';
import { MOCK_ROOMS } from '../../data/mock-rooms';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    CommonModule,
    UnitDetailsLayout
  ],
  templateUrl: './room-details.html'
})
export class RoomDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);

  room?: RoomModel;

  roomFeatures: UnitFeature[] = [];

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('id'));

    this.room = MOCK_ROOMS.find(
      room => room.id === roomId
    );

    if (this.room) {
      this.roomFeatures = [
        {
          label: 'Wifi',
          value: this.room.hasWifi,
          icon: 'wifi',
          type: 'boolean'
        },
        {
          label: 'Private Bathroom',
          value: this.room.hasPrivateBathroom,
          icon: 'bathtub',
          type: 'boolean'
        },
        {
          label: 'AC',
          value: this.room.hasAC,
          icon: 'ac_unit',
          type: 'boolean'
        },
        {
          label: 'Kitchen Access',
          value: this.room.hasKitchenAccess,
          icon: 'kitchen',
          type: 'boolean'
        },
        {
          label: 'Furnished',
          value: this.room.isFurnished,
          icon: 'chair',
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

// import { ActivatedRoute, RouterLink } from '@angular/router';

// import { RoomModel } from '../../models/room.model';
// import { MOCK_ROOMS } from '../../data/mock-rooms';

// @Component({
//   selector: 'app-room-details',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterLink
//   ],
//   templateUrl: './room-details.html',
//   styleUrls: ['./room-details.scss']
// })
// export class RoomDetails implements OnInit {

//   private readonly route = inject(ActivatedRoute);
//   private readonly location = inject(Location);

//   room?: RoomModel;

//   currentImageIndex = signal(0);

//   activeSection = signal<
//     'overview' |
//     'contracts' |
//     'payments' |
//     'maintenance' |
//     'analytics'
//   >('overview');

//   currentImage = computed(() => {
//     return this.room?.pictureUrls?.[
//       this.currentImageIndex()
//     ] || '';
//   });

//   ngOnInit(): void {
//     const roomId = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//     this.room = MOCK_ROOMS.find(
//       room => room.id === roomId
//     );
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   prevImage(): void {
//     const totalImages = this.room?.pictureUrls?.length ?? 0;

//     if (!totalImages) return;

//     this.currentImageIndex.update(index =>
//       index === 0
//         ? totalImages - 1
//         : index - 1
//     );
//   }

//   nextImage(): void {
//     const totalImages = this.room?.pictureUrls?.length ?? 0;

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