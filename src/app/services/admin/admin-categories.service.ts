import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AddParentCategoryDto} from "../../dto/categories/AddParentCategoryDto";
import {AuthService} from "../auth.service";
import {AddCategoryDto} from "../../dto/categories/AddCategoryDto";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  controller = 'Categories';
  api = environment.apiBase + '/' + this.controller;

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  addParentCategory(dto: AddParentCategoryDto) {
    if (!this.auth.isLoggedAdmin()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Forbidden,
        statusText: 'Forbidden'
      })
    }


    return this.http.post<{ id: number }>(this.api + '/AddParentCategory', dto)
  }

  addCategory(dto: AddCategoryDto) {
    if (!this.auth.isLoggedAdmin()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Forbidden,
        statusText: 'Forbidden'
      })
    }


    return this.http.post<{ id: number }>(this.api, dto)
  }


}
