import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminWordsWrapperService} from "../admin-words-wrapper.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {rNames} from "../../../../app/app-routing.module";
import {ToastsService} from "../../../../app/services/toasts.service";
import {ToastType} from "../../../../app/enums/ToastType";
import {Word} from "../../../../app/interfaces/words/Word";

@Component({
  selector: 'app-admin-words-wrapper',
  templateUrl: './admin-words-wrapper.component.html',
  styleUrls: ['./admin-words-wrapper.component.scss']
})
export class AdminWordsWrapperComponent implements OnInit {
  id: number = 1;
  loading = false;
  protected readonly rNames = rNames;

  constructor(public route: ActivatedRoute,
              private wrapperService: AdminWordsWrapperService,
              private toastService: ToastsService) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.params
      .subscribe({
        next: params => {
          this.loading = true;
          this.id = parseInt(params['id']);
          if (!this.id) {
            this.toastService.pushToast({
              message: 'Not set Id',
              type: ToastType.Danger
            })
            return;
          }

          this.wrapperService.word$.next({} as Word);

          this.wrapperService
            .getWord(this.id)
            .pipe(
              catchError((err: HttpErrorResponse) => {
                this.toastService.pushToast({
                  message: err.message,
                  type: ToastType.Danger
                })
                throw err;

              })
            )
            .subscribe()
            .add(() => this.loading = false)
        },

      })

  }

  back() {
    history.back();
  }
}
