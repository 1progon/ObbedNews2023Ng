import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GetWordDto} from "../dto/news/GetWordDto";
import {Word} from "../interfaces/words/Word";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  controller = 'Words';
  api = environment.apiBase + '/' + this.controller;
  limit = 30;

  constructor(private http: HttpClient) {
  }


  // allow anonymous
  getWordsList(page: number = 1, categorySlug?: string) {
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

    return this.http.get<Word[]>(this.api, {params});
  }

  getWordBySlug(slug: string) {
    return this.http.get<GetWordDto>(this.api + '/' + slug);
  }

}
