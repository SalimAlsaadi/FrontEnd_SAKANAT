import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import { ShopModel }
from '../../models/shop.model';

import { MOCK_SHOPS }
from '../../data/mock-shops';

import { UnitDetailsComponent }
from '../../components/unit-details/unit-details';

@Component({
  selector: 'app-shop-details',

  standalone: true,

  imports: [
    CommonModule,
    UnitDetailsComponent
  ],

  templateUrl: './shop-details.html',

  styleUrls: ['./shop-details.scss']
})
export class ShopDetails
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  shop?: ShopModel;

  ngOnInit(): void {

    const shopId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.shop =
      MOCK_SHOPS.find(
        shop =>
          shop.id === shopId
      );
  }
}