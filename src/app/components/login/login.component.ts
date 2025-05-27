import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-login',
    imports: [
        ButtonModule,
        InputTextModule,
        FormsModule
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent { }
