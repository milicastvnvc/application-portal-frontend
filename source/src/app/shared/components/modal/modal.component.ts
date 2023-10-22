import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input()
  modalBodyText: string = '';

  @Input()
  modalHeaderText: string = '';

  @Output()
  confirmEvent = new EventEmitter<null>();

  confirm(): void {
    this.confirmEvent.emit();
  }

}
