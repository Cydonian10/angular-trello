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
      class="w-full inline-flex items-center px-6 justify-center font-medium tracking-wide transition duration-200  rounded-lg focus:shadow focus:outline-none active:scale-95"
      [ngClass]="colors"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  color: Colors = 'primary';
  @Input() padding: Padding = 'py-3';

  @Input('color') set _color(value: Colors) {
    this.color = value;
  }

  mapColors: Record<Colors, Record<string, boolean>> = {
    primary: {
      'bg-primary-600': true,
      'hover:bg-primary-700': true,
      'text-white': true,
    },
    Sky: {
      'bg-sky-600': true,
      'hover:bg-sky-700': true,
      'text-white': true,
    },
    Yellow: {
      'bg-yellow-600': true,
      'hover:bg-yellow-700': true,
      'text-white': true,
    },
    Green: {
      'bg-green-600': true,
      'hover:bg-green-700': true,
      'text-white': true,
    },
    Red: {
      'bg-red-600': true,
      'hover:bg-red-700': true,
      'text-white': true,
    },
    Violet: {
      'bg-violet-600': true,
      'hover:bg-violet-700': true,
      'text-white': true,
    },
    Gray: {
      'bg-gray-600': true,
      'hover:bg-gray-700': true,
      'text-white': true,
    },
    ligth: {
      'bg-gray-200': true,
      'hover:bg-gray-300': true,
      'text-gray-800': true,
    },
    white: {
      'bg-white': true,
      'hover:bg-gray-100': true,
      'text-gray-800': true,
    },
  };

  mapPadding: Record<Padding, Record<string, boolean>> = {
    'py-1': {
      'py-1': true,
      'px-3': true,
    },
    'py-2': {
      'py-2': true,
    },
    'py-3': {
      'py-3': true,
    },
    'py-4': {
      'py-40': true,
    },
  };

  get colors() {
    const colors = this.mapColors[this.color];
    const padding = this.mapPadding[this.padding];

    return { ...colors, ...padding };
  }
}
