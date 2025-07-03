import { Directive, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'a[appSafeLink]', //anchar tag and has app safe linke this will be enable
  standalone: true, // this directive can be used in standalone components
  host: {
    '(click)': 'onConfirmLeavePage($event)', // prevent default anchor behavior
  },
})
export class SafeLinkDirective {
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  // @Input() set safeLink(url: string) {
  //   const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  //   this.el.nativeElement.href = sanitizedUrl;
  // }

  onConfirmLeavePage(event: MouseEvent) {
    const confirmed = confirm('Are you sure you want to leave this page?');
    if (confirmed) {
      return;
    }
    event?.preventDefault(); // prevent default anchor behavior
  }
}
