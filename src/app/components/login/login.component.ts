import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginRequest } from '../../models/auth/login-request.model';
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
    loginRequest: LoginRequest = { username: '', password: '' };
    private readonly authService = inject(AuthService);
    private readonly toastService = inject(ToastService);
    private readonly router = inject(Router);
    dataLogin = this.authService.getDataLogin();

    login() {
        this.authService.login(this.loginRequest).subscribe({
            next: (res) => {
                this.authService.setLoginData(res);
                this.router.navigate(['/home']);
                this.toastService.showSuccess('Éxito', 'Inicio de sesión exitoso');
            },
            error: (err) => {
                console.error('Error de login', err);
                this.toastService.showError('Error', 'Datos de acceso incorrectos');
            }
        });
    }

    ver(){
        console.log(this.dataLogin());
    }

}
