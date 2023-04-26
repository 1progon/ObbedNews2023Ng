import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth.service";
import {Comment} from "../../../../interfaces/Comment";
import {ToastsService} from "../../../../services/toasts.service";
import {News} from "../../../../interfaces/News";
import {NewsService} from "../../../../services/news.service";
import {ToastType} from "../../../../enums/ToastType";
import {AccountNewsService} from "../../../../services/account/account-news.service";
import {LikeType} from "../../../../enums/news/LikeType";
import {AddCommentDto} from "../../../../dto/news/AddCommentDto";
import {FavoriteStatus} from "../../../../enums/news/FavoriteStatus";
import {rNames} from "../../../../app-routing.module";
import {NewsVideoSection} from "../../../../interfaces/NewsVideoSection";
import {NewsWrapperService} from "../news-wrapper.service";
import {NewsWrapperComponent} from "../news-wrapper/news-wrapper.component";

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit {
  r = rNames;

  news: News = <News>{};
  votedLikeFor = LikeType.Undefined;
  LikeType = LikeType;
  isUpdatingLike: boolean = false;
  isUpdatingFavorites = false;
  sumCount: number = 0;
  isPostingComment = false;
  safeMainImage?: SafeResourceUrl;
  imagesPath: string = environment.imagesPath;
  isInFavorites: boolean = false;
  hiddenArticle = false;

  isOnlyPreview: boolean = false;

  sections: NewsVideoSection[] = [];
  filteredSections: NewsVideoSection[] = [];


  constructor(public route: ActivatedRoute,
              public auth: AuthService,
              private newsService: NewsService,
              private accountNewsService: AccountNewsService,
              private titleService: Title,
              private toastService: ToastsService,
              private san: DomSanitizer,
              public wrapperService: NewsWrapperService,
              public wrapperComponent: NewsWrapperComponent) {
  }


  ngOnInit(): void {
    document.body.scrollIntoView();

    this.wrapperService.news$
      .subscribe({
        next: value => {
          if (!value.id) {
            return;
          }

          this.votedLikeFor = LikeType.Undefined;

          this.titleService.setTitle(value.name + ' news');
          this.news = value;
          this.updateSumCount();

          this.safeMainImage = '';
          if (value.mainImage) {
            this.safeMainImage = this.san
              .bypassSecurityTrustResourceUrl(this.imagesPath + '/' + value.mainImage ?? '');
          }

          if (this.auth.isLogged()) {
            if (value.userNewsLikes?.length
              && value.userNewsLikes[0]?.likeType) {
              this.votedLikeFor = value.userNewsLikes[0].likeType;
            }

            if (value.userNewsFavorites?.length
              && value.userNewsFavorites[0]?.newsId == value.id) {
              this.isInFavorites = true;
            }
          }

          this.filteredSections = this.sections = value.videoSections;


        },
      })


  }


  updateSumCount() {
    return this.sumCount = this.news.dislikesCount + this.news.likesCount;
  }

  // left - dislike
  leftProgressWidth() {
    return isNaN((this.news.dislikesCount * 100) / this.sumCount)
      ? 0
      : (this.news.dislikesCount * 100) / this.sumCount;
  }

  // right - like
  rightProgressWidth() {
    return isNaN((this.news.likesCount * 100) / this.sumCount)
      ? 0
      : (this.news.likesCount * 100) / this.sumCount;
  }

  onLikeDislikeUpdate(likeType: LikeType) {
    if (!this.auth.isLogged()) {
      this.toastService.pushToast(
        {
          message: 'Need to login or register',
          type: ToastType.Info
        }
      )
      return;
    }
    if (this.isUpdatingLike) {
      return;
    }

    this.isUpdatingLike = true;

    setTimeout(() => {
      this.accountNewsService.updateLikeVote(likeType, this.news.id)
        .subscribe({
          next: value => {
            this.news.dislikesCount = value.dislikesCount;
            this.news.likesCount = value.likesCount;
            this.news.likesRate = value.rate;
            this.votedLikeFor = likeType;

            if (value.removeVote) {
              this.votedLikeFor = LikeType.Undefined;
            }

            this.updateSumCount();

          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
          }
        })
        .add(() => this.isUpdatingLike = false);
    }, 300)


  }

  addNewComment(newComment: AddCommentDto) {
    if (this.isPostingComment) {
      return;
    }

    this.isPostingComment = true;
    newComment.newsId = this.news.id;

    setTimeout(() => {
      this.accountNewsService
        .addComment(newComment)
        .subscribe({
          next: value => {
            let comment = <Comment>{
              message: value.message,
              title: value.title,
              status: value.status,
              parentCommentId: value.parentCommentId,
              user: {},
              childComments: <Comment[]>[]
            };
            this.news.comments = [comment, ...this.news.comments];
            this.toastService
              .pushToast({
                message: 'New comment added and wait for moderation!',
                type: ToastType.Info
              });
          }
        })
        .add(() => this.isPostingComment = false)
    }, 300)

  }

  votedPeopleCount() {
    this.updateSumCount();
    return isNaN(this.sumCount) ? 'counting...' : this.sumCount;
  }

  siteNameWithoutHttp(site: string) {
    return site.replace(/https?:\/\//gi, '');
  }

  siteWithHttp(site: string) {
    return site.startsWith('https://') || site.startsWith('http://', 0)
      ? site
      : 'https://' + site
  }

  updateFav() {
    if (this.isUpdatingFavorites) {
      return;
    }

    if (!this.auth.isLogged()) {
      this.toastService.pushToast(
        {
          message: 'Need to login or register',
          type: ToastType.Info
        }
      )
      return;
    }

    this.isUpdatingFavorites = true;
    setTimeout(() => {
      this.accountNewsService.updateFavorites(this.news.id, this.isInFavorites)
        .subscribe({
          next: value => {

            if (value.status == FavoriteStatus.Added) {
              this.isInFavorites = true;
            } else if (value.status == FavoriteStatus.Removed) {
              this.isInFavorites = false;
            }
          },
          error: (err: HttpErrorResponse) => console.error(err)
        })
        .add(() => this.isUpdatingFavorites = false)
    }, 300)


  }

  updateHiddenArticle(elementToScroll?: HTMLDivElement) {
    this.hiddenArticle = !this.hiddenArticle;
    if (this.hiddenArticle && elementToScroll) {
      elementToScroll.scrollIntoView();
    }
  }

  showPreview(elementRefToScroll: HTMLDivElement) {
    this.isOnlyPreview = !this.isOnlyPreview;
    if (this.isOnlyPreview) {
      this.filteredSections = this.sections
        .map(s => {
          return {...s, videos: s.videos.filter(value => value.isFree)} as NewsVideoSection;
        })
        .filter(value => value.videos.length > 0)

    } else {
      this.filteredSections = this.sections;
    }

    elementRefToScroll.scrollIntoView();
  }

  protected readonly FavoriteStatus = FavoriteStatus;
}
