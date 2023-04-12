import { Todo } from '@/interfaces/todo.interface';
import { ButtonComponent } from '@/shared/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="relative p-4 rounded-md bg-white w-[300px] outline-none">
      <h2 class="font-bold mb-4">{{ data.title | titlecase }}</h2>

      <div class="flex justify-end">
        <app-button padding="py-1">Ahaa</app-button>
      </div>

      <button class="absolute top-3 right-3" (click)="dialogRef.close()">
        <img src="assets/icons/close.svg" alt="close" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoModalComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: Todo
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
