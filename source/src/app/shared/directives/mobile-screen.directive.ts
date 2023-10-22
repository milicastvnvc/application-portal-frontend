import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMobileScreen]'
})
export class MobileScreenDirective {

  @Input() mobileScreen: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.toggleVisibility();
  }

  ngAfterViewInit(): void {
    this.toggleVisibility();
  }

  private toggleVisibility(): void {
    const screenWidth = window.innerWidth;
    if ((this.mobileScreen && screenWidth <= 768) || (!this.mobileScreen && screenWidth > 768)) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

}
