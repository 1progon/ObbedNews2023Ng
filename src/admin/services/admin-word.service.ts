import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {AuthService} from "../../app/services/auth.service";
import {environment} from "../../environments/environment";
import {AddWordInitialDto} from "../../app/dto/words/AddWordInitialDto";
import {AddWordDto} from "../../app/dto/words/AddWordDto";
import {Word} from "../../app/interfaces/words/Word";
import {UpdateWordDto} from "../../app/dto/words/UpdateWordDto";

@Injectable({
  providedIn: 'root'
})
export class AdminWordService {

  controller = 'Words';
  api = environment.apiBase + '/' + this.controller;

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  // only for logged in admin
  addWordGetInitialData() {
    return this.http.get<AddWordInitialDto>(this.api + '/AddWordDtoInitial');
  }

  addWord(dto: AddWordDto) {
    this.checkIsAdmin();

    let formData = new FormData();
    formData.append('jsonDto', JSON.stringify(dto));

    if (dto.mainImage) {
      formData.append('image', dto.mainImage);
    }

    return this.http.post<Word>(this.api, formData)
  }

  removeWord(newsId: number) {
    this.checkIsAdmin();

    return this.http.delete(this.api + '/' + newsId);

  }

  getWordById(newsId: number) {
    this.checkIsAdmin();

    return this.http
      .get<Word>(this.api + '/GetWordById/' + newsId);
  }

  updateWord(dto: UpdateWordDto, newsId: number) {
    this.checkIsAdmin();

    return this.http.put<Word>(this.api + '/' + newsId, dto)
  }

  updateWordImage(newsId: number, image: File) {

    let formData = new FormData();
    formData.append('image', image);

    return this.http.put<Word>(this.api + '/' + newsId + '/UpdateWordMainImage',
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
