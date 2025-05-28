import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del localStorage o de un servicio
    const token = localStorage.getItem('token');
    let headers = req.headers.set('Accept', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `${token}`);
    }

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
