import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.auth.isLogged() || !this.auth.user?.token) {
      this.auth.logout();
      return next.handle(request);
    }


    let headers = request.headers
      .append('Authorization', 'Bearer ' + this.auth.user.token);

    request = request.clone({
      headers
    });

    return next.handle(request);
  }
}
