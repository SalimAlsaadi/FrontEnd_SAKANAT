import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import { FlatModel }
from '../../models/flat.model';

import { MOCK_FLATS }
from '../../data/mock-flats';

import { UnitDetailsComponent }
from '../../components/unit-details/unit-details';

@Component({
  selector: 'app-flat-details',

  standalone: true,

  imports: [
    CommonModule,
    UnitDetailsComponent
  ],

  templateUrl: './flat-details.html',

  styleUrls: ['./flat-details.scss']
})
export class FlatDetails
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  flat?: FlatModel;

  ngOnInit(): void {

    const flatId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.flat =
      MOCK_FLATS.find(
        flat =>
          flat.id === flatId
      );
  }
}