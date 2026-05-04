import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `<p>Redirecting to sign in...</p>`
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.login();
  }
}