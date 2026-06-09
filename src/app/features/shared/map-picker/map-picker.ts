import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import type {
  Map as LeafletMap,
  Marker as LeafletMarker,
  TileLayer
} from 'leaflet';

export interface MapPickerLocation {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-picker.html',
  styleUrls: ['./map-picker.scss']
})
export class MapPickerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;

  @Input() initialLatitude: number | null = null;
  @Input() initialLongitude: number | null = null;

  @Input() defaultLatitude = 23.5880;
  @Input() defaultLongitude = 58.3829;
  @Input() defaultZoom = 12;

  @Output()
  locationSelected = new EventEmitter<MapPickerLocation>();

  @Output()
  cancelled = new EventEmitter<void>();

  selectedLatitude: number | null = null;
  selectedLongitude: number | null = null;

  isTilesLoading = true;
  isLocating = false;

  private L?: typeof import('leaflet');
  private map?: LeafletMap;
  private marker?: LeafletMarker;
  private tileLayer?: TileLayer;
  private resizeObserver?: ResizeObserver;
  private destroyed = false;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    private readonly ngZone: NgZone
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.L = await import('leaflet');

    requestAnimationFrame(() => {
      setTimeout(() => {
        this.createMap();
      }, 200);
    });
  }

  private createMap(): void {
    if (!this.L || this.destroyed) {
      return;
    }

    const hasInitialLocation =
      this.initialLatitude !== null &&
      this.initialLongitude !== null &&
      !Number.isNaN(Number(this.initialLatitude)) &&
      !Number.isNaN(Number(this.initialLongitude));

    const startLatitude = hasInitialLocation
      ? Number(this.initialLatitude)
      : this.defaultLatitude;

    const startLongitude = hasInitialLocation
      ? Number(this.initialLongitude)
      : this.defaultLongitude;

    this.selectedLatitude = hasInitialLocation
      ? Number(startLatitude.toFixed(7))
      : null;

    this.selectedLongitude = hasInitialLocation
      ? Number(startLongitude.toFixed(7))
      : null;

    this.map = this.L.map(this.mapContainer.nativeElement, {
      center: [startLatitude, startLongitude],
      zoom: hasInitialLocation ? 16 : this.defaultZoom,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true
    });

    this.L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    this.tileLayer = this.L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
        updateWhenIdle: true,
        keepBuffer: 4
      }
    );

    this.tileLayer.on('loading', () => {
      this.ngZone.run(() => {
        this.isTilesLoading = true;
      });
    });

    this.tileLayer.on('load', () => {
      this.ngZone.run(() => {
        setTimeout(() => {
          this.isTilesLoading = false;
          this.forceMapResize();
        }, 350);
      });
    });

    this.tileLayer.addTo(this.map);

    if (
      this.selectedLatitude !== null &&
      this.selectedLongitude !== null
    ) {
      this.setMarker(
        this.selectedLatitude,
        this.selectedLongitude
      );
    }

    this.map.on('click', event => {
      this.ngZone.run(() => {
        this.updateSelectedLocation(
          event.latlng.lat,
          event.latlng.lng
        );
      });
    });

    this.map.whenReady(() => {
      this.forceMapResize();

      setTimeout(() => {
        this.ngZone.run(() => {
          this.isTilesLoading = false;
        });
      }, 1200);
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.invalidateMapSize();
    });

    this.resizeObserver.observe(this.mapContainer.nativeElement);

    this.forceMapResize();
  }

  private updateSelectedLocation(
    latitude: number,
    longitude: number
  ): void {
    const normalizedLatitude = Number(latitude.toFixed(7));
    const normalizedLongitude = Number(longitude.toFixed(7));

    this.selectedLatitude = normalizedLatitude;
    this.selectedLongitude = normalizedLongitude;

    this.setMarker(
      normalizedLatitude,
      normalizedLongitude
    );
  }

  private setMarker(
    latitude: number,
    longitude: number
  ): void {
    if (!this.L || !this.map) {
      return;
    }

    const enterpriseIcon = this.L.divIcon({
      className: 'aqark-map-marker',
      html: `
        <div class="aqark-marker-pin">
          <span class="material-icons">location_on</span>
        </div>
      `,
      iconSize: [52, 52],
      iconAnchor: [26, 50],
      popupAnchor: [0, -46]
    });

    if (this.marker) {
      this.marker.setLatLng([latitude, longitude]);
      return;
    }

    this.marker = this.L.marker(
      [latitude, longitude],
      {
        icon: enterpriseIcon,
        draggable: true
      }
    ).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker?.getLatLng();

      if (!position) {
        return;
      }

      this.ngZone.run(() => {
        this.updateSelectedLocation(
          position.lat,
          position.lng
        );
      });
    });
  }

  useCurrentLocation(): void {
    if (!isPlatformBrowser(this.platformId) || !navigator.geolocation) {
      alert('Current location is not supported by this browser.');
      return;
    }

    this.isLocating = true;

    navigator.geolocation.getCurrentPosition(
      position => {
        this.ngZone.run(() => {
          const latitude = Number(position.coords.latitude.toFixed(7));
          const longitude = Number(position.coords.longitude.toFixed(7));

          this.updateSelectedLocation(latitude, longitude);

          this.map?.setView(
            [latitude, longitude],
            17,
            {
              animate: true
            }
          );

          this.forceMapResize();
          this.isLocating = false;
        });
      },
      () => {
        this.ngZone.run(() => {
          this.isLocating = false;
          alert('Unable to get your current location. Please allow location permission or select manually.');
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  }

  resetToDefaultLocation(): void {
    this.map?.setView(
      [this.defaultLatitude, this.defaultLongitude],
      this.defaultZoom,
      {
        animate: true
      }
    );

    this.forceMapResize();
  }

  confirmLocation(): void {
    if (
      this.selectedLatitude === null ||
      this.selectedLongitude === null
    ) {
      alert('Please select a location on the map first.');
      return;
    }

    this.locationSelected.emit({
      latitude: this.selectedLatitude,
      longitude: this.selectedLongitude
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }

  private forceMapResize(): void {
    setTimeout(() => this.invalidateMapSize(), 50);
    setTimeout(() => this.invalidateMapSize(), 200);
    setTimeout(() => this.invalidateMapSize(), 500);
    setTimeout(() => this.invalidateMapSize(), 900);
    setTimeout(() => this.invalidateMapSize(), 1300);
  }

  private invalidateMapSize(): void {
    if (!this.map || this.destroyed) {
      return;
    }

    this.map.invalidateSize({
      animate: false,
      pan: false
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    this.resizeObserver?.disconnect();
    this.map?.off();
    this.map?.remove();

    this.map = undefined;
    this.marker = undefined;
    this.tileLayer = undefined;
  }
}