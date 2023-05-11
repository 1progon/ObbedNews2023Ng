import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ParentCategory} from "../interfaces/words/ParentCategory";
import {Category} from "../interfaces/words/Category";

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
