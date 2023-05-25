import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../../app/services/auth.service";
import {AddCommentDto} from "../../app/dto/words/AddCommentDto";
import {AddedCommentDto} from "../../app/dto/words/AddedCommentDto";
import {LikeType} from "../../app/enums/news/LikeType";
import {PostUpdateLikeDto} from "../../app/dto/words/PostUpdateLikeDto";
import {UpdatedLike} from "../../app/dto/words/UpdatedLike";
import {FavoriteStatus} from "../../app/enums/news/FavoriteStatus";
import {Word} from "../../app/interfaces/words/Word";

@Injectable({
  providedIn: 'root'
})
export class AccountWordsService {

  controller = 'Words';
  api = environment.apiBase + '/' + this.controller;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  addComment(addCommentDto: AddCommentDto) {

    let path = this.api + '/AddComment';
    return this.http.post<AddedCommentDto>(path, addCommentDto);

  }

  updateLikeVote(type: LikeType, newsId: number) {
    let dto = {
      wordId: newsId,
      type
    } as PostUpdateLikeDto;

    let path = this.api + '/UpdateLike';
    return this.http.post<UpdatedLike>(path, dto)

  }

  updateFavorites(newsId: number, remove: boolean) {

    if (!this.authService.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Нужно войти или зарегистрироваться'
      });
    }

    let params = new HttpParams();
    if (remove) {
      params = params.append('remove', true);
    }

    let path = this.api + '/' + newsId + '/UpdateFavorites';

    return this.http.post<{ status: FavoriteStatus }>(
      path,
      null,
      {params})
  }

  getFavorites() {
    if (!this.authService.isLogged()) {
      throw  new HttpErrorResponse({status: HttpStatusCode.Unauthorized});
    }


    return this.http.get<Word[]>(this.api + '/GetFavorites');
  }
}
