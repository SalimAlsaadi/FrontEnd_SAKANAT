import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const payload = this.loginForm.value;

    this.http.post(`${environment.apiBaseUrl}/auth/login`, payload).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.token); // update if token structure is different
        this.router.navigate(['/']); // or navigate to dashboard
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
