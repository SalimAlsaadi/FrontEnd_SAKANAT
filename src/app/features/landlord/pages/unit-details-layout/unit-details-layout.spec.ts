import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailsLayout } from './unit-details-layout';

describe('UnitDetailsLayout', () => {
  let component: UnitDetailsLayout;
  let fixture: ComponentFixture<UnitDetailsLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitDetailsLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitDetailsLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
