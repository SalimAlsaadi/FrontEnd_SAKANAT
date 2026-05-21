import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { BuildingCardComponent }from '../../components/building-card/building-card';
import { BuildingModel }from '../../models/building.model';
import { LandlordPropertyService }from '../../services/landlord.service';

@Component({
  selector: 'app-buildings-list',

  standalone: true,

  imports: [
    CommonModule,
    BuildingCardComponent,
    RouterLink
  ],

  templateUrl: './buildings-list.html',

  styleUrls: ['./buildings-list.scss']
})
export class BuildingsList implements OnInit {

  private readonly propertyService =
    inject(LandlordPropertyService);

  private readonly router =
    inject(Router);

  buildings: BuildingModel[] = [];

  loading = false;

  ngOnInit(): void {

    this.loadBuildings();
  }

  /* =========================================================
     LOAD BUILDINGS
  ========================================================= */

  private loadBuildings(): void {

    this.loading = true;

    this.propertyService
      .getBuildings()
      .subscribe({

        next: buildings => {

          this.buildings = buildings;

          this.loading = false;
        },

        error: error => {

          console.error(
            'Failed to load buildings',
            error
          );

          this.loading = false;
        }
      });
  }

  /* =========================================================
     OPEN DETAILS
  ========================================================= */

  openBuilding(
    building: BuildingModel
  ): void {

    this.router.navigate([
      '/landlord/buildings',
      building.id
    ]);
  }

  /* =========================================================
     TRACK BY
  ========================================================= */

  trackById(
    _: number,
    item: BuildingModel
  ): number {

    return item.id;
  }
}