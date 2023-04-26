import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {News} from "../../interfaces/News";
import {AuthService} from "../auth.service";
import {AddCommentDto} from "../../dto/news/AddCommentDto";
import {AddedCommentDto} from "../../dto/news/AddedCommentDto";
import {LikeType} from "../../enums/news/LikeType";
import {PostUpdateLikeDto} from "../../dto/news/PostUpdateLikeDto";
import {UpdatedLike} from "../../dto/news/UpdatedLike";
import {FavoriteStatus} from "../../enums/news/FavoriteStatus";

@Injectable({
  providedIn: 'root'
})
export class AccountNewsService {

  controller = 'News';
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
      newsId: newsId,
      type
    } as PostUpdateLikeDto;

    let path = this.api + '/UpdateLike';
    return this.http.post<UpdatedLike>(path, dto)

  }

  updateFavorites(newsId: number, remove: boolean) {

    if (!this.authService.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Need to login or register'
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


    return this.http.get<News[]>(this.api + '/GetFavorites');
  }
}
