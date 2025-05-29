import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
        ReactiveFormsModule
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form: FormGroup;
    private readonly authService = inject(AuthService);
    private readonly toastService = inject(ToastService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    dataLogin = this.authService.getDataLogin();

    constructor() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        if (this.form.invalid) return;
        const loginRequest = this.form.value;
        this.authService.login(loginRequest).subscribe({
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
}
