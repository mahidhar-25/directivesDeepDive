import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' }); // input property to get the user type
  private AuthService = inject(AuthService);
  private templateRef = inject(TemplateRef); // inject TemplateRef to access the template inside ng-template
  // ViewContainerRef is used to create and destroy views dynamically
  private viewContainerRef = inject(ViewContainerRef);
  constructor() {
    effect(() => {
      if (this.AuthService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef); //this will renderes based on condition
        console.log(`User is authenticated as ${this.userType()}`);
      } else {
        this.viewContainerRef.clear(); //this will clear the view if condition is not met
        console.log(`User is not authenticated as ${this.userType()}`);
      }
    });
  }
}
