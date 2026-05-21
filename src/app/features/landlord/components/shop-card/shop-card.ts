import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ShopModel }
from '../../models/shop.model';

@Component({
  selector: 'app-shop-card',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './shop-card.html',

  styleUrls: ['./shop-card.scss']
})
export class ShopCardComponent {

  @Input({ required: true })
  shop!: ShopModel;

  @Output()
  openDetails =
    new EventEmitter<ShopModel>();

  currentImageIndex = 0;

  /* =========================================
     OPEN DETAILS
  ========================================== */

  onOpen(): void {

    this.openDetails.emit(this.shop);
  }

  /* =========================================
     NEXT IMAGE
  ========================================== */

  nextImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.shop.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex + 1
      ) %
      this.shop.pictureUrls.length;
  }

  /* =========================================
     PREVIOUS IMAGE
  ========================================== */

  previousImage(
    event: Event
  ): void {

    event.stopPropagation();

    if (!this.shop.pictureUrls?.length) {
      return;
    }

    this.currentImageIndex =
      (
        this.currentImageIndex - 1 +
        this.shop.pictureUrls.length
      ) %
      this.shop.pictureUrls.length;
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

    if (this.shop.hasStorage) {
      features.push('📦 Storage');
    }

    if (this.shop.hasParking) {
      features.push('🚗 Parking');
    }

    if (this.shop.hasBathroom) {
      features.push('🚻 Bathroom');
    }

    if (this.shop.hasInternet) {
      features.push('📶 Internet');
    }

    if (this.shop.hasAC) {
      features.push('❄ AC');
    }

    return features;
  }
}