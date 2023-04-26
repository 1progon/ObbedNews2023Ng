import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import {Comment} from "../../../../../interfaces/Comment";
import {AddCommentDto} from "../../../../../dto/news/AddCommentDto";
import {CommentStatus} from "../../../../../enums/news/comments/CommentStatus";
import {rNames} from "../../../../../app-routing.module";

@Component({
  selector: 'app-news-comments-list',
  templateUrl: './news-comments-list.component.html',
  styleUrls: ['./news-comments-list.component.scss']
})
export class NewsCommentsListComponent {
  @Input() comments: Comment[] = []
  @Input() isPosting = false;
  @Output() onAddComment: EventEmitter<AddCommentDto> = new EventEmitter<AddCommentDto>();

  r = rNames;

  subCommentDto: AddCommentDto = <AddCommentDto>{}
  CommentStatus = CommentStatus;
  responseFieldId?: number;

  constructor(public authService: AuthService) {
  }

  showResponseField(index: number) {
    if (index == this.responseFieldId) {
      this.responseFieldId = undefined;
    } else {
      this.responseFieldId = index;
    }

  }

  onSubmitSubComment(parentCommentId: number) {
    this.subCommentDto.parentCommentId = parentCommentId;
    this.onAddComment.emit(this.subCommentDto);
    this.subCommentDto = <AddCommentDto>{};
  }
}
