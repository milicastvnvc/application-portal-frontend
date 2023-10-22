import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[toogle-password]'
})
export class TooglePasswordDirective {

  private _shown = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    const icon = document.createElement('i');
    icon.className = 'bi bi-eye-slash';
    icon.style.position = "absolute";
    icon.style.right = "1.8rem";
    icon.style.fontSize = "1.4rem";
    icon.style.color = "#555";
    icon.style.cursor = "pointer";
    icon.addEventListener('click', () => {
      this.toggle(icon);
    });
    parent.appendChild(icon);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.className = 'bi bi-eye';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.className = 'bi bi-eye-slash';
    }
  }

}
