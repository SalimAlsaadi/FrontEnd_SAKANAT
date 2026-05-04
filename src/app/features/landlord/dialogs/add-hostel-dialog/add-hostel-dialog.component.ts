@Component({
  selector: 'app-add-hostel-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-hostel-dialog.component.html',
  styleUrls: ['./add-hostel-dialog.component.scss']
})
export class AddHostelDialogComponent {

  model = {
    hostelName: '',
    hostelType: '',
    location: '',
    description: ''
  };

  close = inject(MatDialogRef<AddHostelDialogComponent>);

  submit(): void {
    this.close.close(this.model);
  }
}