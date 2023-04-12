import { Colors, Padding } from '@/interfaces/button.interface';
import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-link',
  imports: [NgClass,RouterModule,AsyncPipe],
  standalone: true,
  template: `
    <!-- [routerLinkActiveOptions]="{ exact: true}" -->
    <button
      type="button"
      [ngClass]="colors"
      [routerLink]="_link|async"
      [routerLinkActive]="active"
      class="px-5 w-full text-left font-medium rounded-md text-sm transition-all"
    >
      <ng-content></ng-content>
    </button>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() color: Colors = 'primary';
  @Input() padding: Padding = 'py-3';
  // @Input()  link:string = ""
  public _link = new BehaviorSubject("")

  @Input("link") set link(value:string) {
    this._link.next(value)
  }


  mapActive: Record<Colors, Record<string, boolean>> = {
    success: {
      'text-success-600': true,
      'bg-success-100':true
    },
    primary: {
      'text-primary-600': true,
      'bg-primary-100':true
    },
    danger: {
      'text-danger-600': true,
      'bg-danger-100':true
    },
  };

  mapColors: Record<Colors, Record<string, boolean>> = {
    success: {
      'hover:text-success-600': true,
      'hover:bg-success-100':true
    },
    primary: {
      'hover:text-primary-600': true,
      'hover:bg-primary-100':true
    },
    danger: {
      'hover:text-danger-600': true,
      'hover:bg-danger-100':true
    },
  };

  mapPadding: Record<Padding, Record<string, boolean>> = {
    'py-1':{
      "py-1":true
    },
    'py-2': {
      'py-2': true,
    },
    'py-3': {
      'py-3': true,
    },
    'py-4': {
      'py-4': true,
    },
   
  };

  get active() {
    const active = Object.keys(this.mapActive[this.color])
    return active
  }

  get colors() {
    const colors = this.mapColors[this.color];
    const padding = this.mapPadding[this.padding];
    return { ...colors, ...padding };
  }
}
