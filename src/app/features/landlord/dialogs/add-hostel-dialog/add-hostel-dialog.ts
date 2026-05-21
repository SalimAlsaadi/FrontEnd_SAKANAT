import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-hostel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-hostel-dialog.html',
  styleUrls: ['./add-hostel-dialog.scss']
})
export class AddHostelDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AddHostelDialogComponent>);

  hostelTypes = [
    { value: 'HOSTEL', label: 'Hostel' },
    { value: 'BUILDING', label: 'Building' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'FLAT', label: 'Flat' },
    { value: 'ROOM', label: 'Room' }
  ];

  form = this.fb.group({
    hostelName: ['', [Validators.required, Validators.minLength(3)]],
    hostelType: ['', Validators.required],
    location: ['', Validators.required],
    description: ['']
  });

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }
}