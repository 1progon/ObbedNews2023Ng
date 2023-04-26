import {Injectable} from '@angular/core';
import {LoginDto} from "../dto/users/LoginDto";
import {UserDto} from "../dto/users/UserDto";
import {HttpClient} from "@angular/common/http";
import {RegisterDto} from "../dto/users/RegisterDto";
import {catchError, map} from "rxjs";
import {UserType} from "../enums/users/UserType";
import {Router, UrlTree} from "@angular/router";
import {environment} from "../../environments/environment";
import {rNames} from "../app-routing.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserDto | undefined = undefined;
  controller = 'Auth';
  api = environment.apiBase + '/' + this.controller;
  returnUrl?: string | UrlTree;

  constructor(private router: Router,
              private http: HttpClient) {
  }

  isLogged() {
    if (!this.user || !this.user.guid || !this.user.email || !this.user.token || (this.user.userType == UserType.Undefined)) {
      //   try to get from storage
      let fromS = JSON.parse(sessionStorage.getItem('user') as string) as UserDto;
      if (fromS && fromS.token && fromS.email && fromS.guid && fromS.userType) {
        this.user = fromS;
      }
    }
    return !!(this.user && this.user.guid && this.user.email && this.user.token && this.user.userType);
  }

  isLoggedAdmin() {
    return this.isLogged() && this.user?.userType == UserType.Admin;
  }

  getUserFromStorage() {
    return JSON.parse(sessionStorage.getItem('user') as string) as UserDto;
  }

  setUserToStorage(value: UserDto) {
    sessionStorage.setItem('user', JSON.stringify(value));
  }

  removeUserFromStorage() {
    sessionStorage.removeItem('user');
  }

  updateUser(user: UserDto) {
    this.user = user;
    this.setUserToStorage(user);
  }

  login(dto: LoginDto) {
    return this.http.post<UserDto>(this.api + '/Login', dto)
      .pipe(map(value => {
          this.setUserToStorage(value);
          this.user = value;
          return value;
        }),
        catchError(err => {
          console.log(err);
          return err;
        }))
  }

  register(dto: RegisterDto) {
    return this.http.post<UserDto>(this.api + '/Register', dto)
      .pipe(map(value => {
        this.setUserToStorage(value);
        this.user = value;
        return value;
      }));
  }


  logout() {
    this.user = undefined;
    this.removeUserFromStorage();
    if (this.router.url.match(/\/(account|admin).*/gi)) {
      this.router.navigate(['/', rNames.login]).finally();
    }
  }

  logoutWithRedirect(path: string = '/' + rNames.login) {
    this.logout();
    this.router.navigateByUrl(path).finally();
  }
}

