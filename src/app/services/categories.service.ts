import {Injectable} from '@angular/core';
import {Category} from "../interfaces/Category";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ParentCategory} from "../interfaces/ParentCategory";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  controller = 'Categories';
  api = environment.apiBase + '/' + this.controller;

  constructor(private http: HttpClient) {
  }

  // parent categories
  getParentCategories() {
    return this.http.get<ParentCategory[]>(this.api + '/GetParentCategories')
  }

  // categories
  getCategories() {
    return this.http.get<Category[]>(this.api)
  }
}
