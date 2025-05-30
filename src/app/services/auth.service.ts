import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/auth/login-request.model';
import { LoginResponse } from '../models/auth/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/auth';
  private readonly loginData = signal<LoginResponse | null>(null);

  constructor(private readonly http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('loginData');
      if (saved) {
        this.loginData.set(JSON.parse(saved));
      }
    }
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  logout(data: LoginResponse): Observable<any> {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('loginData');
    }
    return this.http.post(`${this.apiUrl}/logout`, data.refreshToken);
  }
  getDataLogin() {
    return this.loginData.asReadonly();

  }
  setLoginData(data: LoginResponse) {
    this.loginData.set(data);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('loginData', JSON.stringify(data));
    }
  }
}
