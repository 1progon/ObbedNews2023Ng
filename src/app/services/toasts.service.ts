import {Injectable} from '@angular/core';
import {ToastType} from "../enums/ToastType";
import type {Toast} from "../interfaces/Toast";

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  timeOut = 2000;
  setTimeOutIds: NodeJS.Timeout[] = []

  constructor() {
  }

  private _toasts: Toast[] = [];

  get toasts(): Toast[] {
    return this._toasts;
  }

  pushToast(message: { message: string, type: ToastType }) {

    let toast = message as Toast;
    toast.id = Date.now();

    switch (toast.type) {
      case ToastType.Success:
        toast.title = 'Success';
        break;
      case ToastType.Danger:
        toast.title = 'Danger';
        break;
      case ToastType.Warning:
        toast.title = 'Warning';
        break;
      case ToastType.Info:
        toast.title = 'Info';
        break;
      default:
        toast.title = 'Message';
        break;

    }


    let maxToasts = 50;
    if (this._toasts.length > maxToasts) {
      let deleteCount = this._toasts.length - maxToasts;

      this._toasts.splice(0, deleteCount);
      this.setTimeOutIds.splice(0, deleteCount);
    }

    // push new toast to array
    this._toasts.push(toast);

    // remove toast from array with delay
    let id = setTimeout(() => {
      this._toasts.shift();
      this.setTimeOutIds.shift();
    }, this.timeOut * (this._toasts.length + 1));

    this.setTimeOutIds.push(id);
  }

  removeToast(id: number) {
    this._toasts = this._toasts.filter(value => value.id != id);

    this.setTimeOutIds.forEach(value => {
      clearTimeout(value);
    })
  }

  removeAllToasts() {
    this._toasts = [];
  }
}
