import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {News} from "../../interfaces/News";
import {environment} from "../../../environments/environment";
import {AddNewsDtoInitial} from "../../dto/news/AddNewsDtoInitial";
import {AddNewsDto} from "../../dto/news/AddNewsDto";
import {UpdateNewsDto} from "../../dto/news/UpdateNewsDto";

@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {

  controller = 'News';
  api = environment.apiBase + '/' + this.controller;

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  // only for logged in admin
  addNewsGetInitialData() {
    return this.http.get<AddNewsDtoInitial>(this.api + '/AddNewsDtoInitial')
  }

  addNews(dto: AddNewsDto) {
    this.checkIsAdmin();

    let formData = new FormData();
    formData.append('jsonDto', JSON.stringify(dto));

    if (dto.mainImage) {
      formData.append('image', dto.mainImage);
    }

    return this.http.post<News>(this.api, formData)
  }

  removeNews(newsId: number) {
    this.checkIsAdmin();

    return this.http.delete(this.api + '/' + newsId);

  }

  getNewsById(newsId: number) {
    this.checkIsAdmin();

    return this.http
      .get<News>(this.api + '/GetNewsById/' + newsId);
  }

  updateNews(dto: UpdateNewsDto, newsId: number) {
    this.checkIsAdmin();

    return this.http.put<News>(this.api + '/' + newsId, dto)
  }

  updateNewsImage(newsId: number, image: File) {

    let formData = new FormData();
    formData.append('image', image);

    return this.http.put<News>(this.api + '/' + newsId + '/UpdateNewsMainImage',
      formData,
    )

  }

  videoFoldersToDb(newsId: number) {
    return this.http.get<{ status: number; message: string }>(this.api + '/' + newsId + '/AddVideosToDb');
  }

  private checkIsAdmin() {
    if (!this.authService.isLoggedAdmin()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Forbidden,
        statusText: 'Not Authorized'
      });
    }
  }
}
