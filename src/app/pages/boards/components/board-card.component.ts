import { IBoard } from '@/interfaces/board.interface';
import { Colors } from '@/interfaces/button.interface';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [RouterLink, NgClass],
  template: `
    <div [routerLink]="['/board', data.id]">
      <div
        class="rounded-md h-20 w-full p-3 text-white shadow"
        [ngClass]="colors"
      >
        {{ data.title }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input() data: IBoard = {
    id: 0,
    title: '',
    backgroundColor: 'Sky',
    userId: 0,
    members: [],
    list: [],
  };

  mapColors: Record<Colors, Record<string, boolean>> = {
    Sky: {
      'bg-sky-600': true,
      'hover:bg-sky-500': true,
    },
    Gray: {
      'bg-gray-600': true,
      'hover:bg-gray-500': true,
    },
    Yellow: {
      'bg-yellow-600': true,
      'hover:bg-yellow-500': true,
    },
    Green: {
      'bg-green-600': true,
      'hover:bg-green-500': true,
    },
    Red: {
      'bg-red-600': true,
      'hover:bg-red-500': true,
    },
    Violet: {
      'bg-violet-600': true,
      'hover:bg-violet-500': true,
    },
    primary: {
      'bg-primary-600': true,
      'hover:bg-primary-500': true,
    },
    ligth: {
      'bg-gray-600': true,
      'hover:bg-gray-500': true,
    },
    white: {
      'bg-white': true,
      'hover:bg-gray-200': true,
    },
  };

  get colors() {
    const colors = this.mapColors[this.data.backgroundColor];
    return { ...colors };
  }
}
