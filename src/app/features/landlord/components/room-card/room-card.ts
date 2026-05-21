import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { RoomModel }
from '../../models/room.model';

@Component({
  selector: 'app-room-card',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './room-card.html',

  styleUrls: ['./room-card.scss']
})
export class RoomCardComponent {

  @Input({ required: true })
  room!: RoomModel;

  @Output()
  openDetails =
    new EventEmitter<RoomModel>();

  currentImageIndex = 0;

  /* =========================================
     OPEN DETAILS
  ========================================== */

  onOpen(): void {

    this.openDetails.emit(this.room);
  }

  /* =========================================
     NEXT IMAGE
  ========================================== */

  nextImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.room.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex + 1
      ) %
      this.room.pictureUrls.length;
  }

  /* =========================================
     PREVIOUS IMAGE
  ========================================== */

  previousImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.room.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex - 1 +
        this.room.pictureUrls.length
      ) %
      this.room.pictureUrls.length;
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
     FEATURES
  ========================================== */

  get features(): string[] {

    const features: string[] = [];

    if (this.room.hasAC) {
      features.push('❄ AC');
    }

    if (this.room.hasWifi) {
      features.push('📶 WiFi');
    }

    if (this.room.hasPrivateBathroom) {
      features.push('🚿 Private Bath');
    }

    if (this.room.hasKitchenAccess) {
      features.push('🍳 Kitchen');
    }

    if (this.room.isFurnished) {
      features.push('🛋 Furnished');
    }

    return features;
  }
}