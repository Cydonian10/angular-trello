import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, KeyValuePipe,NgIf],
  template: `
    <label class="block mb-1 font-medium text-slate-700">{{ label }}</label>
    <input
      [type]="type"
      [formControl]="control"
      class="block rounded-md w-full p-2.5 text-gray-900 border ring-1 ring-gray-300 bg-gray-50/60 sm:text-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-slate-400 outline-none"
    />
    <ng-container *ngIf="control.invalid && control.touched">
      <span class="text-danger-400 font-bold text-sm" *ngFor="let err of control.errors | keyvalue">
        {{ errorMessages[err.key] }}
      </span>
    </ng-container>
  `,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {

  public control = new FormControl()

  @Input() label: string = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  // @Input() control = new FormControl();

  @Input("control") set _control(value: FormControl) {
    this.control = value
  }

  errorMessages: Record<string, string> = {
    required: 'The field is required',
    email: 'The email is required',
    minlength:"Field min length is the 4 characeters"
  };

}
