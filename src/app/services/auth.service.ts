import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/auth/login-request.model';
import { LoginResponse } from '../models/auth/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly loginData = signal<LoginResponse | null>(null);

  constructor(private readonly http: HttpClient) { 
   }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, '"string"');
  }
  getDataLogin() {
    return this.loginData.asReadonly();

  }
  setLoginData(data: LoginResponse) {
    this.loginData.set(data);
  }
}
