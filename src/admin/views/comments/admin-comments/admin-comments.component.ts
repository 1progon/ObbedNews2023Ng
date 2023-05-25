import {Component, OnInit} from "@angular/core";
import {rNames} from "../../../../app/app-routing.module";
import {CommentStatus} from "../../../../app/enums/news/comments/CommentStatus";
import {WordComment} from "../../../../app/interfaces/words/WordComment";
import {CommentsService} from "../../../../app/services/comments.service";

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
  protected readonly rNames = rNames;
  protected readonly CommentStatus = CommentStatus;

  comments: WordComment[] = [];
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


  updateCommentStatus(comment: WordComment, commentStatus: CommentStatus) {
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
