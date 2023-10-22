import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastEvent } from '../models/toast-event';
import { ToastTypes } from '../models/toast-types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showSuccessToast(message: string): void {
    this._toastEvents.next({
      message,
      type: ToastTypes.Success,
    });
  }

  showInfoToast(message: string): void {
    this._toastEvents.next({
      message,
      type: ToastTypes.Info,
    });
  }

  showWarningToast(message: string): void {
    this._toastEvents.next({
      message,
      type: ToastTypes.Warning,
    });
  }

  showErrorsToast(messages: string[]): void {
    for(let i = 0; i < messages.length; i++) {
      this._toastEvents.next({
        message: messages[i],
        type: ToastTypes.Error,
      });
    }
  }
}
