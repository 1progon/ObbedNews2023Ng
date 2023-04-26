import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Tag} from "../../../../interfaces/Tag";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {AddNewsDto} from "../../../../dto/news/AddNewsDto";
import {rNames} from "../../../../app-routing.module";
import {Category} from "../../../../interfaces/Category";
import {ParentCategory} from "../../../../interfaces/ParentCategory";
import {AdminNewsWrapperService} from "../admin-news-wrapper.service";

@Component({
  selector: 'app-admin-news-add',
  templateUrl: './admin-news-add.component.html',
  styleUrls: ['./admin-news-add.component.scss']
})
export class AdminNewsAddComponent implements OnInit {
  form: AddNewsDto = <AddNewsDto>{};
  loading = false;
  isPosting = false;
  formTagsString: string = '';
  imageFile?: SafeResourceUrl;
  errors?: {};

  categories: Category[] = [];

  parentCats: ParentCategory[] = [];
  catsWithoutParents: Category[] = [];


  constructor(private adminNewsService: AdminNewsService,
              private router: Router,
              private san: DomSanitizer,
              private wrapperService: AdminNewsWrapperService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.adminNewsService.addNewsGetInitialData()
      .subscribe({
        next: value => {
          this.categories = value.categories;
          this.catsWithoutParents = this.categories.filter(value1 => !value1.parentCategory);


          // create parents cats array
          this.categories.map(c => {
            if (c.parentCategory && !this.parentCats
              .find(p => p.id == c.parentCategory?.id)) {
              this.parentCats.push(c.parentCategory)
            }
          })


        }
      })
      .add(() => this.loading = false)
  }


  onSubmit() {
    this.isPosting = true;
    this.errors = undefined;

    this.adminNewsService.addNews(this.form)
      .subscribe({
        next: value => {
          if (value.id) {
            this.router.navigate(['/', rNames.news, value.slug])
              .finally();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.errors = err.error;

        }
      })
      .add(() => this.isPosting = false);
  }

  updateFormTags() {
    this.form.tags = this.formTagsString
      .split('|')
      .filter(value => value.length > 0)
      .map(value => {

        return <Tag>{
          name: value.toLowerCase(),
          slug: this.wrapperService.createSlugFromString(value)
        }
      })


  }

  showImage(target: EventTarget | null) {
    const file = (target as HTMLInputElement).files?.[0] as File;
    if (file) {
      this.form.mainImage = file;
    }

    // create sanitized url for image preview
    this.imageFile = this.san
      .bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

  }

  updateSlug() {
    this.form.slug = this.wrapperService.createSlugFromString(this.form.slug);
  }

  createSlug() {
    this.form.slug = this.form.name;
    this.updateSlug();
  }

  toNumber(key: string) {
    return Number(key);
  }


}
