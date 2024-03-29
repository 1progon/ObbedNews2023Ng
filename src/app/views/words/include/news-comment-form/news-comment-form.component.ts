import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {rNames} from "../../../../app-routing.module";
import {AddCommentDto} from "../../../../dto/words/AddCommentDto";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-news-comment-form',
  templateUrl: './news-comment-form.component.html',
  styleUrls: ['./news-comment-form.component.scss']
})
export class NewsCommentFormComponent implements OnChanges {
  @Input() isPosting = false;
  @Output() onAddComment = new EventEmitter<AddCommentDto>();
  r = rNames;

  commentDto: AddCommentDto = <AddCommentDto>{};
  isShowForm: boolean = false;


  constructor(public authService: AuthService) {
  }

  onSubmitNewComment() {
    if (this.commentDto.message == '') {
      return;
    }

    this.onAddComment.emit(this.commentDto);
    this.commentDto = <AddCommentDto>{};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isPosting']) {
      this.isPosting = changes['isPosting'].currentValue;
    }
  }
}
