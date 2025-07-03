import { Directive, ElementRef, inject, input, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]', //anchar tag and has app safe linke this will be enable
  standalone: true, // this directive can be used in standalone components
  host: {
    '(click)': 'onConfirmLeavePage($event)', // prevent default anchor behavior
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // inject ElementRef to access the host element
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}
  queryParam = input('my-app', { alias: 'appSafeLink' }); // input property to get query parameter

  // @Input() set safeLink(url: string) {
  //   const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  //   this.el.nativeElement.href = sanitizedUrl;
  // }

  onConfirmLeavePage(event: MouseEvent) {
    const confirmed = confirm('Are you sure you want to leave this page?');
    if (confirmed) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?myapp=' + this.queryParam(); // append a query parameter to indicate it's a safe link
      return;
    }
    event?.preventDefault(); // prevent default anchor behavior
  }
}
