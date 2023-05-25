import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AdminWordsWrapperService} from "../admin-words-wrapper.service";
import {AddWordDto} from "../../../../app/dto/words/AddWordDto";
import {Category} from "../../../../app/interfaces/words/Category";
import {ParentCategory} from "../../../../app/interfaces/words/ParentCategory";
import {AdminWordService} from "../../../services/admin-word.service";
import {rNames} from "../../../../app/app-routing.module";
import {Tag} from "../../../../app/interfaces/Tag";

@Component({
  selector: 'app-admin-word-add',
  templateUrl: './admin-word-add.component.html',
  styleUrls: ['./admin-word-add.component.scss']
})
export class AdminWordAddComponent implements OnInit {
  form: AddWordDto = <AddWordDto>{};
  loading = false;
  isPosting = false;
  formTagsString: string = '';
  imageFile?: SafeResourceUrl;
  errors?: {};

  categories: Category[] = [];

  parentCats: ParentCategory[] = [];
  catsWithoutParents: Category[] = [];


  constructor(private adminNewsService: AdminWordService,
              private router: Router,
              private san: DomSanitizer,
              private wrapperService: AdminWordsWrapperService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.adminNewsService.addWordGetInitialData()
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

    this.adminNewsService.addWord(this.form)
      .subscribe({
        next: value => {
          if (value.id) {
            this.router.navigate(['/', rNames.dictionary, value.slug])
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
