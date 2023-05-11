import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeHtml, SafeResourceUrl, Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth.service";
import {ToastsService} from "../../../../services/toasts.service";
import {WordService} from "../../../../services/word.service";
import {ToastType} from "../../../../enums/ToastType";
import {AccountWordsService} from "../../../../services/account/account-words.service";
import {LikeType} from "../../../../enums/news/LikeType";
import {AddCommentDto} from "../../../../dto/news/AddCommentDto";
import {FavoriteStatus} from "../../../../enums/news/FavoriteStatus";
import {rNames} from "../../../../app-routing.module";
import {WordWrapperService} from "../word-wrapper.service";
import {WordWrapperComponent} from "../word-wrapper/word-wrapper.component";
import {Word} from "../../../../interfaces/words/Word";
import {WordVideoSection} from "../../../../interfaces/words/WordVideoSection";
import {WordComment} from "../../../../interfaces/words/WordComment";
import {SpeechPartEnum} from "../../../../enums/news/SpeechPartEnum";
import {EngLevel} from "../../../../enums/news/EngLevel";

@Component({
  selector: 'app-word-single',
  templateUrl: './word-single.component.html',
  styleUrls: ['./word-single.component.scss']
})
export class WordSingleComponent implements OnInit, AfterViewInit {
  r = rNames;

  word: Word = <Word>{};
  nearbyWords: Word[] = [];
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

  sections: WordVideoSection[] = [];
  filteredSections: WordVideoSection[] = [];

  safeArticle?: SafeHtml;

  yaButtonsScript: string = 'https://yastatic.net/share2/share.js';


  constructor(public route: ActivatedRoute,
              public auth: AuthService,
              private wordService: WordService,
              private accountWordsService: AccountWordsService,
              private titleService: Title,
              private toastService: ToastsService,
              private san: DomSanitizer,
              public wrapperService: WordWrapperService,
              public wrapperComponent: WordWrapperComponent,
              private renderer: Renderer2) {
  }


  ngOnInit(): void {
    this.route.params.subscribe({
      next: () => {
        document.body.scrollIntoView();
      }
    })

    this.wrapperService.word$
      .subscribe({
        next: value => {
          if (!value.id) {
            return;
          }

          this.votedLikeFor = LikeType.Undefined;

          this.titleService.setTitle(value.name + '|' + environment.websiteName);
          this.word = value;
          this.updateSumCount();

          this.safeMainImage = '';
          if (value.mainImage) {
            this.safeMainImage = this.san
              .bypassSecurityTrustResourceUrl(this.imagesPath + '/' + value.mainImage ?? '');
          }

          if (this.word.article) {
            this.safeArticle = this.san.bypassSecurityTrustHtml(this.word.article);
          }

          if (this.auth.isLogged()) {
            if (value.userWordLikes?.length
              && value.userWordLikes[0]?.likeType) {
              this.votedLikeFor = value.userWordLikes[0].likeType;
            }

            if (value.userWordFavorites?.length
              && value.userWordFavorites[0]?.wordId == value.id) {
              this.isInFavorites = true;
            }
          }

          this.filteredSections = this.sections = value.videoSections;


        },
      })

    this.wrapperService.nearbyWords$
      .subscribe({
        next: value => {
          if (!value.length) {
            return;
          }

          this.nearbyWords = value;
        }
      })


  }

  ngAfterViewInit(): void {
    // add share buttons yandex script
    let s: HTMLScriptElement = this.renderer.createElement('script');
    s.async = true;
    s.src = this.yaButtonsScript;

    this.renderer.appendChild(document.body, s);
  }


  updateSumCount() {
    return this.sumCount = this.word.dislikesCount + this.word.likesCount;
  }

  // left - dislike
  leftProgressWidth() {
    return isNaN((this.word.dislikesCount * 100) / this.sumCount)
      ? 0
      : (this.word.dislikesCount * 100) / this.sumCount;
  }

  // right - like
  rightProgressWidth() {
    return isNaN((this.word.likesCount * 100) / this.sumCount)
      ? 0
      : (this.word.likesCount * 100) / this.sumCount;
  }

  onLikeDislikeUpdate(likeType: LikeType) {
    if (!this.auth.isLogged()) {
      this.toastService.pushToast(
        {
          message: 'Нужно войти или зарегистрироваться',
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
      this.accountWordsService.updateLikeVote(likeType, this.word.id)
        .subscribe({
          next: value => {
            this.word.dislikesCount = value.dislikesCount;
            this.word.likesCount = value.likesCount;
            this.word.likesRate = value.rate;
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
    newComment.wordId = this.word.id;

    setTimeout(() => {
      this.accountWordsService
        .addComment(newComment)
        .subscribe({
          next: value => {
            let comment = <WordComment>{
              message: value.message,
              title: value.title,
              status: value.status,
              parentCommentId: value.parentCommentId,
              user: {},
              childComments: <WordComment[]>[]
            };
            this.word.comments = [comment, ...this.word.comments];
            this.toastService
              .pushToast({
                message: 'Новый комментарий ожидает модерации! Спасибо.',
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

  updateFav() {
    if (this.isUpdatingFavorites) {
      return;
    }

    if (!this.auth.isLogged()) {
      this.toastService.pushToast(
        {
          message: 'Нужно войти или зарегистрироваться',
          type: ToastType.Info
        }
      )
      return;
    }

    this.isUpdatingFavorites = true;
    setTimeout(() => {
      this.accountWordsService.updateFavorites(this.word.id, this.isInFavorites)
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
          return {...s, videos: s.videos.filter(value => value.isFree)} as WordVideoSection;
        })
        .filter(value => value.videos.length > 0)

    } else {
      this.filteredSections = this.sections;
    }

    elementRefToScroll.scrollIntoView();
  }


  protected readonly rNames = rNames;
  protected readonly SpeechPartEnum = SpeechPartEnum;
  protected readonly EngLevel = EngLevel;
}
