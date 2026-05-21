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
  openDetails =
    new EventEmitter<BuildingModel>();

  onOpen(): void {

    this.openDetails.emit(this.building);
  }

  
  get occupancyPercentage(): number {

    if (!this.building.totalUnits) {
      return 0;
    }

    return Math.round(
      (
        this.building.occupiedUnits /
        this.building.totalUnits
      ) * 100
    );
  }
}