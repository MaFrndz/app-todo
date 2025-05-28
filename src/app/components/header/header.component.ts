import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgIf, ButtonModule],
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  dataLogin = this.authService.getDataLogin();
  get firstname(): string {
    return this.dataLogin()?.firstName || '';
  }
  get lastname(): string {
    return this.dataLogin()?.lastName || '';
  }
  logout() {
    const data = this.dataLogin();
    if (data) {
      this.authService.logout(data).subscribe(() => {
        window.location.href = '/';
      });
    }
  }
}
