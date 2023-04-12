import { Colors, Padding } from '@/interfaces/button.interface';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  standalone: true,
  template: `
    <button
      type="button"
      [ngClass]="colors"
      class="w-full inline-flex items-center justify-center px-6 font-medium tracking-wide text-white transition duration-200 bg-primary-600 rounded-lg hover:bg-primary-500 focus:shadow focus:outline-none active:scale-95"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ButtonComponent {
  @Input() color: Colors = 'primary';
  @Input() padding: Padding = 'py-3';

  mapColors: Record<Colors, Record<string, boolean>> = {
    success: {
      'bg-success-600': true,
      'hover:bg-success-500': true,
    },
    primary: {
      'bg-primary-600': true,
      'hover:bg-primary-500': true,
    },
    danger: {
      'bg-danger-600': true,
      'hover:bg-danger-500': true,
    },
  };

  mapPadding:Record<Padding,Record<string,boolean>> = {
    'py-1':{
      "py-1":true
    },
    'py-2': {
        'py-2':true,
    },
    'py-3': {
        'py-3':true
    },
    'py-4': {
        'py-40':true
    }
  }

  get colors() {
    const colors = this.mapColors[this.color];
    const padding = this.mapPadding[this.padding]
    return { ...colors, ...padding };
  }
}
