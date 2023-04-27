import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comment} from "../interfaces/Comment";
import {CommentStatus} from "../enums/news/comments/CommentStatus";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  controller = 'Comments';
  api = environment.apiBase + '/' + this.controller;

  constructor(private http: HttpClient) {
  }

  getComments() {
    return this.http.get<Comment[]>(this.api);
  }

  getCommentsWaitModeration() {
    return this.http.get<Comment[]>(this.api + '/GetCommentsWaitModeration');
  }

  updateCommentStatus(commentId: number, status: CommentStatus) {
    let params = new HttpParams();
    params = params.append('commentStatus', status);

    return this.http.post<Comment>(
      this.api + '/' + commentId + '/UpdateCommentStatus',
      null,
      {params});
  }
}
