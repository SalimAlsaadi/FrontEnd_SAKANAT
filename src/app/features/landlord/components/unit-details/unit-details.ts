import { CommonModule } from '@angular/common';

import {
  Component
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-unit-details',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './unit-details.html',

  styleUrls: ['./unit-details.scss']
})
export class UnitDetailsComponent {

}