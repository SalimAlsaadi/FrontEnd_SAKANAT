import { CommonModule, Location } from '@angular/common';
import {
  Component,
  Input,
  computed,
  inject,
  signal
} from '@angular/core';

export type UnitSection =
  | 'overview'
  | 'contracts'
  | 'payments'
  | 'maintenance'
  | 'analytics';

export interface UnitFeature {
  label: string;
  value: string | number | boolean | undefined;
  icon: string;
  type?: 'text' | 'boolean';
}

@Component({
  selector: 'app-unit-details-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-details-layout.html',
  styleUrls: ['./unit-details-layout.scss']
})
export class UnitDetailsLayout {

  private readonly location = inject(Location);

  @Input() unitType = '';
  @Input() unitIcon = 'home';
  @Input() title = '';
  @Input() description = '';
  @Input() images: string[] = [];
  @Input() price = 0;
  @Input() status: 'Available' | 'Occupied' = 'Available';
  @Input() tag = '';
  @Input() locationTitle = '';
  @Input() locationDetails = '';
  @Input() features: UnitFeature[] = [];

  currentImageIndex = signal(0);

  activeSection = signal<UnitSection>('overview');

  currentImage = computed(() => {
    return this.images?.[this.currentImageIndex()] || '';
  });

  goBack(): void {
    this.location.back();
  }

  prevImage(): void {
    const totalImages = this.images?.length ?? 0;

    if (!totalImages) return;

    this.currentImageIndex.update(index =>
      index === 0 ? totalImages - 1 : index - 1
    );
  }

  nextImage(): void {
    const totalImages = this.images?.length ?? 0;

    if (!totalImages) return;

    this.currentImageIndex.update(index =>
      index === totalImages - 1 ? 0 : index + 1
    );
  }

  setSection(section: UnitSection): void {
    this.activeSection.set(section);
  }

  booleanText(value: string | number | boolean): string {
    return value ? 'Available' : 'No';
  }
}