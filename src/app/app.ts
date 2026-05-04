import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/layout/header/header.component';
//import { FooterComponent } from './features/layout/footer/footer.component';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.loadUser();
  }
}

