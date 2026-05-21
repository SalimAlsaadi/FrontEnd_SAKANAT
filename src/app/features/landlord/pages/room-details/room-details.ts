import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import { RoomModel }
from '../../models/room.model';

import { MOCK_ROOMS }
from '../../data/mock-rooms';

import { UnitDetailsComponent }
from '../../components/unit-details/unit-details';

@Component({
  selector: 'app-room-details',

  standalone: true,

  imports: [
    CommonModule,
    UnitDetailsComponent
  ],

  templateUrl: './room-details.html',

  styleUrls: ['./room-details.scss']
})
export class RoomDetails
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  room?: RoomModel;

  ngOnInit(): void {

    const roomId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.room =
      MOCK_ROOMS.find(
        room =>
          room.id === roomId
      );
  }
}