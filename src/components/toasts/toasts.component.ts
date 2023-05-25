import {Component} from '@angular/core';
import {ToastType} from "../../app/enums/ToastType";
import {ToastsService} from "../../app/services/toasts.service";


@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {

  tTypes: typeof ToastType = ToastType;

  constructor(public toastService: ToastsService) {
  }


  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
