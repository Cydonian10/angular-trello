import { Colors, Padding } from '@/interfaces/button.interface';
import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-link',
  imports: [NgClass, RouterModule, AsyncPipe],
  standalone: true,
  template: `
    <!-- [routerLinkActiveOptions]="{ exact: true}" -->
    <button
      type="button"
      [ngClass]="colors"
      [routerLink]="_link | async"
      [routerLinkActive]="active"
      class="px-5 w-full text-left font-medium rounded-md text-sm transition-all"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() color: Colors = 'primary';
  @Input() padding: Padding = 'py-3';
  // @Input()  link:string = ""
  public _link = new BehaviorSubject('');

  @Input('link') set link(value: string) {
    this._link.next(value);
  }

  mapActive: Record<Colors, Record<string, boolean>> = {
    primary: {
      'text-primary-600': true,
      'bg-primary-100': true,
    },
    ligth: {
      'text-gray-600': true,
      'bg-gray-100': true,
    },
    Sky: { 'text-sky-600': true, 'bg-sky-100': true },
    Yellow: { 'text-yellow-600': true, 'bg-yellow-100': true },
    Green: { 'text-green-600': true, 'bg-green-100': true },
    Red: { 'text-red-600': true, 'bg-red-100': true },
    Violet: { 'text-violet-600': true, 'bg-violet-100': true },
    Gray: { 'text-gray-600': true, 'bg-gray-100': true },
    white: { 'text-gray-600': true, 'bg-gray-100': true },
  };

  mapColors: Record<Colors, Record<string, boolean>> = {
    primary: {
      'hover:text-primary-600': true,
      'hover:bg-primary-100': true,
    },
    ligth: {
      'hover:text-danger-600': true,
      'hover:bg-danger-100': true,
    },
    Sky: { 'hover-text-sky-600': true, 'hover:bg-sky-100': true },
    Yellow: { 'hover-text-yellow-600': true, 'hover:bg-yellow-100': true },
    Green: { 'hover-text-green-600': true, 'hover:bg-green-100': true },
    Red: { 'hover-text-red-600': true, 'hover:bg-red-100': true },
    Violet: { 'hover-text-violet-600': true, 'hover:bg-violet-100': true },
    Gray: { 'hover-tex-grayt-600': true, 'hover:bg-gray-100': true },
    white: { 'hover-tex-grayt-600': true, 'hover:bg-gray-100': true },
  };

  mapPadding: Record<Padding, Record<string, boolean>> = {
    'py-1': {
      'py-1': true,
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
    const active = Object.keys(this.mapActive[this.color]);
    return active;
  }

  get colors() {
    const colors = this.mapColors[this.color];
    const padding = this.mapPadding[this.padding];
    return { ...colors, ...padding };
  }
}
