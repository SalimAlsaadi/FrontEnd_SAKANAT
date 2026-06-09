import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';

export type UnitSection =
  | 'overview'
  | 'contracts'
  | 'payments'
  | 'maintenance'
  | 'analytics';

export type UnitQuickActionType =
  | 'edit'
  | 'contracts'
  | 'payments'
  | 'maintenance'
  | 'images'
  | 'delete'
  | 'tenant';

export type UnitQuickActionStyle =
  | 'default'
  | 'primary'
  | 'warning'
  | 'danger';

export interface UnitFeature {
  label: string;
  value: string | number | boolean | undefined;
  icon: string;
  type?: 'text' | 'boolean';
}

export interface UnitQuickAction {
  key: UnitQuickActionType;
  label: string;
  description: string;
  icon: string;
  style: UnitQuickActionStyle;
  section?: UnitSection;
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
  private readonly router = inject(Router);

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

  @Input() rootLabel = 'Buildings';
  @Input() rootRoute: any[] = ['/landlord/buildings'];

  @Input() parentLabel = '';
  @Input() parentRoute: any[] | null = null;

  /**
   * Allow parent pages to override actions for Flat, Room, Shop.
   * If no actions are passed, the component uses default enterprise actions.
   */
  @Input() quickActions: UnitQuickAction[] = [];

  @Output() quickActionClicked = new EventEmitter<UnitQuickActionType>();

  currentImageIndex = signal(0);
  activeSection = signal<UnitSection>('overview');

  currentImage = computed(() => {
    return this.images?.[this.currentImageIndex()]
      || 'assets/images/no-building-image.png';
  });

  defaultQuickActions = computed<UnitQuickAction[]>(() => {
    return [
      {
        key: 'edit',
        label: `Edit ${this.unitType}`,
        description: 'Update unit information',
        icon: 'edit',
        style: 'primary'
      },
      {
        key: 'images',
        label: 'Upload Images',
        description: 'Add or update gallery',
        icon: 'image',
        style: 'default'
      },
      {
        key: 'delete',
        label: `Delete ${this.unitType}`,
        description: 'Remove this unit safely',
        icon: 'delete_outline',
        style: 'danger'
      }
    ];
  });

  visibleQuickActions = computed(() => {
    return this.quickActions.length
      ? this.quickActions
      : this.defaultQuickActions();
  });

  goBack(): void {
    this.location.back();
  }

  goToRoot(): void {
    this.router.navigate(this.rootRoute);
  }

  goToParent(): void {
    if (!this.parentRoute) {
      return;
    }

    this.router.navigate(this.parentRoute);
  }

  prevImage(): void {
    const totalImages = this.images?.length ?? 0;

    if (!totalImages) {
      return;
    }

    this.currentImageIndex.update(index =>
      index === 0 ? totalImages - 1 : index - 1
    );
  }

  nextImage(): void {
    const totalImages = this.images?.length ?? 0;

    if (!totalImages) {
      return;
    }

    this.currentImageIndex.update(index =>
      index === totalImages - 1 ? 0 : index + 1
    );
  }

  setSection(section: UnitSection): void {
    this.activeSection.set(section);
  }

  handleQuickAction(action: UnitQuickAction): void {
    if (action.section) {
      this.setSection(action.section);
    }

    this.quickActionClicked.emit(action.key);
  }

  actionClass(action: UnitQuickAction): string {
    return [
      action.style === 'primary' ? 'primary-action' : '',
      action.style === 'warning' ? 'warning-action' : '',
      action.style === 'danger' ? 'danger-action' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  booleanText(value: string | number | boolean | undefined): string {
    return value ? 'Available' : 'No';
  }
}