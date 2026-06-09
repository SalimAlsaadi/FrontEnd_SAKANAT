import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FlatModel }
from '../../models/flat.model';

@Component({
  selector: 'app-flat-card',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './flat-card.html',

  styleUrls: ['./flat-card.scss']
})
export class FlatCardComponent {

  @Input({ required: true })
  flat!: FlatModel;

  @Output()
  openDetails =
    new EventEmitter<FlatModel>();

  currentImageIndex = 0;

  /* =========================================
     OPEN DETAILS
  ========================================== */

  onOpen(): void {

    this.openDetails.emit(this.flat);
  }

  /* =========================================
     NEXT IMAGE
  ========================================== */

  nextImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.flat.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex + 1
      ) %
      this.flat.pictureUrls.length;
  }

  /* =========================================
     PREVIOUS IMAGE
  ========================================== */

  previousImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.flat.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex - 1 +
        this.flat.pictureUrls.length
      ) %
      this.flat.pictureUrls.length;
  }

  /* =========================================
     SET IMAGE
  ========================================== */

  setImage(
    index: number,
    event: Event
  ): void {

    event.stopPropagation();

    this.currentImageIndex = index;
  }

  /* =========================================
     GET FEATURES
  ========================================== */

  get features(): string[] {

    const features: string[] = [];

    features.push(
      `🛏 ${this.flat.numberOfRooms} Rooms`
    );

    features.push(
      `🛁 ${this.flat.numberOfBathrooms} Baths`
    );

    if (this.flat.amenities.parking) {
      features.push('🚗 Parking');
    }

    if (this.flat.amenities.swimmingPool) {
      features.push('🏊 Pool');
    }

    if (this.flat.amenities.gym) {
      features.push('💪 Gym');
    }

    if (this.flat.hasLivingRoom) {
      features.push('🛋 Living Room');
    }

    return features;
  }
}