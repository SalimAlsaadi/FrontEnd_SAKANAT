import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHostelDialog } from './add-hostel-dialog';

describe('AddHostelDialog', () => {
  let component: AddHostelDialog;
  let fixture: ComponentFixture<AddHostelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHostelDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHostelDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
