import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminNewsWrapperService} from "../admin-news-wrapper.service";
import {ToastsService} from "../../../../services/toasts.service";
import {catchError} from "rxjs";
import {ToastType} from "../../../../enums/ToastType";
import {HttpErrorResponse} from "@angular/common/http";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-admin-news-wrapper',
  templateUrl: './admin-news-wrapper.component.html',
  styleUrls: ['./admin-news-wrapper.component.scss']
})
export class AdminNewsWrapperComponent implements OnInit {
  id: number = 1;
  loading = false;
  protected readonly rNames = rNames;

  constructor(public route: ActivatedRoute,
              private wrapperService: AdminNewsWrapperService,
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
          this.wrapperService
            .getNewsSingle(this.id)
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
