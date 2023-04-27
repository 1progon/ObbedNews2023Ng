import {Component, OnInit} from '@angular/core';
import {Comment} from "../../../../interfaces/Comment";
import {CommentsService} from "../../../../services/comments.service";
import {CommentStatus} from "../../../../enums/news/comments/CommentStatus";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
  protected readonly rNames = rNames;
  protected readonly CommentStatus = CommentStatus;

  comments: Comment[] = [];
  loading: boolean = false;
  showOnlyModeration: boolean = false;

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.commentsService.getComments()
      .subscribe({
        next: comments => {
          this.comments = comments;
        }
      })
      .add(() => this.loading = false);
  }

  filteredComments() {
    return this.showOnlyModeration
      ? this.comments.filter(value => value.status == CommentStatus.Moderation)
      : this.comments;
  }


  updateCommentStatus(comment: Comment, commentStatus: CommentStatus) {
    if (comment.status == commentStatus) {
      return;
    }
    this.loading = true;

    this.commentsService.updateCommentStatus(comment.id, commentStatus)
      .subscribe({
        next: updatedComment => {
          let c = this.comments.find(value => value.id == comment.id);
          if (c) {
            c.status = updatedComment.status;
          }
        }
      })
      .add(() => this.loading = false);
  }

}
