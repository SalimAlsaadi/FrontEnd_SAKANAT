import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-protected',
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent {

  loading = signal(false);
  result = signal<any>(null);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  callApi() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get(`${environment.apiBaseUrl}/api/me`, {
      withCredentials: true
    }).subscribe({
      next: res => {
        this.result.set(res);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message || 'API error');
        this.loading.set(false);
      }
    });
  }
}
