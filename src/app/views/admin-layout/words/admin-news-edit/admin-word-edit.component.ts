import {Component, OnInit} from '@angular/core';
import {AdminWordsWrapperService} from "../admin-words-wrapper.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsService} from "../../../../services/toasts.service";
import {ToastType} from "../../../../enums/ToastType";
import {AdminWordService} from "../../../../services/admin/admin-word.service";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {UpdateWordDto} from "../../../../dto/words/UpdateWordDto";
import {TagDto} from "../../../../dto/words/TagDto";
import {rNames} from "../../../../app-routing.module";
import {Category} from "../../../../interfaces/words/Category";
import {WordSection} from "../../../../interfaces/words/dictionary/WordSection";
import {SpeechPartSection} from "../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../interfaces/words/dictionary/Meaning";
import {SpecialDefinitionBlock} from "../../../../interfaces/words/dictionary/SpecialDefinitionBlock";
import {Definition} from "../../../../interfaces/words/dictionary/Definition";
import {WordSound} from "../../../../interfaces/words/dictionary/WordSound";

@Component({
  selector: 'app-admin-word-edit',
  templateUrl: './admin-word-edit.component.html',
  styleUrls: ['./admin-word-edit.component.scss']
})
export class AdminWordEditComponent implements OnInit {
  r = rNames;
  loading = false;
  isPosting = false;
  form: UpdateWordDto = <UpdateWordDto>{}
  tagsString: string = '';
  newsId?: number;
  allowSlugUpdate: boolean = false;
  errors?: {};
  mainImagePath?: string;
  mainThumbPath?: SafeResourceUrl;
  imagesPath = environment.imagesPath;
  categories: Category[] = [];

  wordSection = {} as WordSection;
  showMainEditForm: boolean = false;

  constructor(public ws: AdminWordsWrapperService,
              private adminWordService: AdminWordService,
              private toastService: ToastsService,
              private router: Router,
              public route: ActivatedRoute,
              private san: DomSanitizer,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.loading = true;
    document.body.scrollIntoView();

    this.adminWordService.addWordGetInitialData()
      .subscribe({
        next: value => {
          this.categories = value.categories;
        }
      })
      .add(() => this.loading = false)

    this.ws.word$
      .subscribe({
        next: word => {
          if (word.wordSection) {
            this.wordSection = word.wordSection;
          }
          this.titleService.setTitle('Admin Word Edit ' + word.id + ': ' + word.name);

          this.newsId = word.id;

          if (word.mainThumb) {
            this.mainThumbPath = this.imagesPath + '/' + word.mainThumb + '?time=' + Date.now();
          }
          if (word.mainImage) {
            this.mainImagePath = this.imagesPath + '/' + word.mainImage + '?time=' + Date.now();
          }
          this.form = {
            id: word.id,
            categoryId: word.categoryId,
            article: word.article,
            description: word.description,
            name: word.name,
            newsLink: word.newsLink,
            slug: word.slug,
            popular: word.popular,
            removeImage: false,
            likes: word.likesCount,
            disLikes: word.dislikesCount,
            isDraft: word.isDraft,
          }

          if (word.tags) {
            this.form.tags = word.tags
              .map(tag => {
                return {
                  name: tag.name,
                  slug: tag.slug,
                  id: tag.id
                } as TagDto
              })


            this.tagsString = word.tags
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

        let tag = this.form.tags?.find(tag => tag.name == tagName);
        if (tag) {
          tag.name = tagName.toLowerCase();
          tag.slug = this.ws.createSlugFromString(tagName);
          return tag;

        } else {

          return <TagDto>{
            name: tagName.toLowerCase(),
            slug: this.ws.createSlugFromString(tagName)
          }
        }


      })


  }

  updateSlug() {
    this.form.slug = this.ws.createSlugFromString(this.form.slug);
  }

  updateImagePreview(e: Event) {
    let file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    this.form.mainImage = file;
    this.mainThumbPath = this.san.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

  }

  onSubmitMainForm() {

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

    // add separated wordSection to form
    this.form.wordSection = this.wordSection;

    this.adminWordService.updateWord(this.form, this.newsId)
      .subscribe({
        next: value => {
          this.ws.word$.next(value);

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
    this.adminWordService
      .updateWordImage(this.newsId, this.form.mainImage)
      .subscribe({
        next: value => {
          this.ws.word$.next(value);

          this.router
            .navigate(['detail'], {relativeTo: this.route.parent})
            .finally();
        },
        error: (err: HttpErrorResponse) => console.error(err)

      })
      .add(() => this.isPosting = false)
  }

  videoFoldersToDb() {
    if (!this.newsId) {
      return;
    }
    this.adminWordService.videoFoldersToDb(this.newsId)
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


  setActiveSection(speechPart: SpeechPartSection,
                   section?: (Meaning | SpecialDefinitionBlock | Definition | WordSound | undefined)[],
  ) {

    this.ws.activeSpeechPart = speechPart;
    this.ws.activeSection = section?.[0];
    this.ws.activeSection2 = section?.[1];
  }

  resetActiveSection() {
    this.ws.activeSpeechPart = undefined;
    this.ws.activeSection = undefined;
    this.ws.activeSection2 = undefined;
  }
}
