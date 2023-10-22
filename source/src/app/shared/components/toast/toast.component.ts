import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { ToastTypes } from '../../models/toast-types';
import { fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: ToastTypes;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.toast = new Toast(this.toastEl.nativeElement, { delay: 5000 });

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide(): void {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
