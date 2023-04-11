import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  template: `
      <label class="block mb-1 font-medium text-slate-700"
        >{{ label }}</label
      >
      <input
        [type]="type"
        class="block rounded-md w-full p-2.5 text-gray-900 border ring-1 ring-gray-300 bg-gray-50/60 sm:text-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-slate-400 outline-none"
      />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
}
