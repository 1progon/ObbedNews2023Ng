import {Component, OnInit} from '@angular/core';
import {AdminNewsWrapperService} from "../admin-news-wrapper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsService} from "../../../../services/toasts.service";
import {ToastType} from "../../../../enums/ToastType";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {UpdateNewsDto} from "../../../../dto/news/UpdateNewsDto";
import {TagDto} from "../../../../dto/news/TagDto";
import {rNames} from "../../../../app-routing.module";
import {Category} from "../../../../interfaces/Category";

@Component({
  selector: 'app-admin-news-edit',
  templateUrl: './admin-news-edit.component.html',
  styleUrls: ['./admin-news-edit.component.scss']
})
export class AdminNewsEditComponent implements OnInit {
  r = rNames;
  loading = false;
  isPosting = false;
  form: UpdateNewsDto = <UpdateNewsDto>{}
  tagsString: string = '';
  newsId?: number;
  allowSlugUpdate: boolean = false;
  errors?: {};
  mainImagePath?: string;
  mainThumbPath?: SafeResourceUrl;
  imagesPath = environment.imagesPath;
  categories: Category[] = [];

  // udemy
  udemy = {
    maxRating: 5,
    rating: 0.0,
    count: 0,

  };
  udemyMaxRatingReadonly = true;

  constructor(private wrapperService: AdminNewsWrapperService,
              private adminNewsService: AdminNewsService,
              private toastService: ToastsService,
              private router: Router,
              public route: ActivatedRoute,
              private san: DomSanitizer,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.loading = true;
    document.body.scrollIntoView();

    this.adminNewsService.addNewsGetInitialData()
      .subscribe({
        next: value => {
          this.categories = value.categories;
        }
      })
      .add(() => this.loading = false)

    this.wrapperService.news$
      .subscribe({
        next: news => {
          this.titleService.setTitle('Admin News Edit ' + news.id + ': ' + news.name);

          this.newsId = news.id;

          if (news.mainThumb) {
            this.mainThumbPath = this.imagesPath + '/' + news.mainThumb + '?time=' + Date.now();
          }
          if (news.mainImage) {
            this.mainImagePath = this.imagesPath + '/' + news.mainImage + '?time=' + Date.now();
          }
          this.form = {
            id: news.id,
            categoryId: news.categoryId,
            article: news.article,
            description: news.description,
            name: news.name,
            newsLink: news.newsLink,
            slug: news.slug,
            popular: news.popular,
            removeImage: false,
            likes: news.likesCount,
            disLikes: news.dislikesCount,
          }

          if (news.tags) {
            this.form.tags = news.tags
              .map(tag => {
                return {
                  name: tag.name,
                  slug: tag.slug,
                  id: tag.id
                } as TagDto
              })


            this.tagsString = news.tags
              .map(tag => tag.name)
              .join('|')
          }
        }
      })
  }


  updateFormTags() {
    this.form.tags = this.tagsString
      .split('|')
      .filter(value => value.length > 0)
      .map(tagName => {
        tagName = tagName
          .replace(/['"_;:,\\?\/.!|~`<>@#$%^&*(){}\[\]]/gi, '')
          .trim();

        let slug = tagName
          .replace(/\s+/gi, '-')
          .replace(/^-/i, '')
          .replace(/-$/i, '');

        let tag = this.form.tags?.find(tag => tag.name == tagName);
        if (tag) {
          tag.name = tagName;
          tag.slug = slug;
          return tag;

        } else {

          return <TagDto>{
            name: tagName,
            slug
          }
        }


      })


  }

  updateSlug() {
    this.form.slug = this.form.slug
      .toLowerCase()
      .replace(/['"_;:,\\?\/.!|~`<>@#$%^&*(){}\[\]]/gi, '')
      .replace(' ', '-')
      .replace(/(-)+/gi, '-')
  }

  updateImagePreview(e: Event) {
    let file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    this.form.mainImage = file;
    this.mainThumbPath = this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

  }

  onSubmitMain() {

    if (!this.newsId) {
      this.toastService.pushToast({
        type: ToastType.Danger,
        message: 'No News Id'
      })
      return;
    }

    this.errors = undefined;

    // update news
    this.isPosting = true;

    this.updateFormTags();
    this.adminNewsService.updateNews(this.form, this.newsId)
      .subscribe({
        next: value => {
          this.wrapperService.news$.next(value);

          this.router
            .navigate(['detail'], {relativeTo: this.route.parent})
            .finally();

        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.errors = err.error;
        }
      })
      .add(() => this.isPosting = false)

  }

  onSubmitImageForm() {
    if (this.isPosting || !this.newsId || !this.form.mainImage) {
      return;
    }

    this.isPosting = true;
    this.adminNewsService
      .updateNewsImage(this.newsId, this.form.mainImage)
      .subscribe({
        next: value => {
          this.wrapperService.news$.next(value);

          this.router
            .navigate(['detail'], {relativeTo: this.route.parent})
            .finally();
        },
        error: (err: HttpErrorResponse) => console.error(err)

      })
      .add(() => this.isPosting = false)
  }

  toNumber(key: string) {
    return Number(key);
  }

  videoFoldersToDb() {
    if (!this.newsId) {
      return;
    }
    this.adminNewsService.videoFoldersToDb(this.newsId)
      .subscribe({
        next: value => {
          this.toastService.pushToast({
            type: ToastType.Info,
            message: value.message
          })
        },
        error: (err: HttpErrorResponse) => this.toastService.pushToast({type: ToastType.Danger, message: err.error})

      })
  }

  countLikesFromUdemy() {
    let percent = (this.udemy.rating * 100 / this.udemy.maxRating) / 100;
    this.form.likes = Math.floor(this.udemy.count * percent);
    this.form.disLikes = Math.floor(this.udemy.count - this.form.likes);
  }
}
