import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog($event)', // host listener for click event
  },
})
export class LogDirective {
  private elementRef = inject<ElementRef>(ElementRef); // inject ElementRef to access the host element
  constructor() {}

  onLog() {
    const element = this.elementRef.nativeElement;
    console.log(
      `Element clicked: ${element.tagName}, Text: ${element.textContent}`
    );
    // You can add more logic here to log other properties or perform actions
  }
}
