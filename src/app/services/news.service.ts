import {Injectable} from '@angular/core';
import {News} from "../interfaces/News";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  controller = 'News';
  api = environment.apiBase + '/' + this.controller;
  limit = 30;

  constructor(private http: HttpClient) {
  }


  // allow anonymous
  getNewsList(page: number = 1, categorySlug?: string) {
    let params = new HttpParams();
    let offset = (page - 1) * this.limit;

    if (this.limit != 30) {
      params = params.append('limit', this.limit.toString());
    }

    if (offset != 0) {
      params = params.append('offset', offset.toString());
    }

    if (categorySlug) {
      params = params.append('categorySlug', categorySlug);
    }

    return this.http.get<News[]>(this.api, {params});
  }

  getNewsBySlug(slug: string) {
    return this.http.get<News>(this.api + '/' + slug);
  }

}
