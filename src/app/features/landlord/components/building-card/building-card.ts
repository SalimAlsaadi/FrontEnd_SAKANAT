import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BuildingModel } from '../../models/building.model';

@Component({
  selector: 'app-building-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './building-card.html',
  styleUrls: ['./building-card.scss']
})

export class BuildingCardComponent {

  @Input({ required: true })
  building!: BuildingModel;

  @Output()
  openDetails = new EventEmitter<BuildingModel>();

  onOpen(): void {

    this.openDetails.emit(this.building);
  }

  imageFailed = false;

get mainImageUrl(): string | null {
  if (this.imageFailed) {
    return null;
  }

  return this.building.pictureUrls?.[0] ?? null;
}

handleImageError(): void {
  this.imageFailed = true;
}
  
 get totalUnits(): number {
  return (
    this.building.flatsRented +
    this.building.flatsNotRented +
    this.building.roomsRented +
    this.building.roomsNotRented +
    this.building.shopsRented +
    this.building.shopsNotRented
  );
}

get occupiedUnits(): number {
  return (
    this.building.flatsRented +
    this.building.roomsRented +
    this.building.shopsRented
  );
}

get availableUnits(): number {
  return (
    this.building.flatsNotRented +
    this.building.roomsNotRented +
    this.building.shopsNotRented
  );
}

get occupancyPercentage(): number {
  if (this.totalUnits === 0) {
    return 0;
  }

  return Math.round((this.occupiedUnits / this.totalUnits) * 100);
}



}