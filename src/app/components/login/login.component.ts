import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-login',
    imports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username = '';
    password = '';
    private readonly authService = inject(AuthService);
    private readonly toastService = inject(ToastService);

    login() {
        this.authService.login({ username: this.username, password: this.password }).subscribe({
            next: (res) => {
                console.log('Login exitoso', res);
                this.authService.loginResponse.set(res);
                this.toastService.showSuccess('Éxito', 'Inicio de sesión exitoso');
            },
            error: (err) => {
                console.error('Error de login', err);
                this.toastService.showError('Error', 'Datos de acceso incorrectos');
            }
        });
    }
}
