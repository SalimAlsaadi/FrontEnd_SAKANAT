import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { HouseModel }
from '../../models/house.model';

@Component({
  selector: 'app-house-card',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './house-card.html',

  styleUrls: ['./house-card.scss']
})
export class HouseCardComponent {

  @Input({ required: true })
  house!: HouseModel;

  @Output()
  openDetails =
    new EventEmitter<HouseModel>();

  onOpen(): void {

    this.openDetails.emit(this.house);
  }
}