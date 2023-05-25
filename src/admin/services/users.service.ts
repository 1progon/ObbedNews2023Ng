import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/interfaces/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api = environment.apiBase;
  controller = 'Users';
  url = this.api + '/' + this.controller;

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }
}
