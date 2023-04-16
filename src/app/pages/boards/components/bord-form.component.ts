import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Colors } from '@/interfaces/button.interface';
import { InputComponent } from '@/shared/input.component';
import { ButtonComponent } from '@/shared/button.component';
import { NgClass, NgFor } from '@angular/common';
import { BoardService } from '@/services/board.service';
import { Router } from '@angular/router';
import { BgColorsPipe } from '@/shared/bg-colors.pipe';

@Component({
  selector: 'app-board-form',
  standalone: true,
  template: `
    <form novalidate [formGroup]="boardForm">
      <div>
        <app-input [control]="title"></app-input>
      </div>

      <div class="flex gap-y-4 gap-x-3 flex-wrap my-5 justify-center">
        <div *ngFor="let color of arrayColors">
          <label class="relative mb-4">
            <input
              type="radio"
              name="backgroundColor"
              class="absolute opacity-0 w-0 h-0 peer"
              [value]="color"
              formControlName="backgroundColor"
            />
            <span
              [ngClass]="mapbgColors | bgColors : color"
              class="border transition-colors py-2 px-4 rounded hover:cursor-pointer peer-checked:border-gray-900 peer-checked:border-2"
            >
            </span>
          </label>
        </div>
      </div>

      <app-button (click)="handleForm()">Save</app-button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgClass,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    BgColorsPipe,
  ],
})
export class BoardFormComponent {
  private fb = inject(FormBuilder);
  private boardSrv = inject(BoardService);
  private router = inject(Router);

  public boardForm = this.fb.nonNullable.group({
    title: [''],
    backgroundColor: new FormControl<Colors>('Sky', {
      nonNullable: true,
      validators: [],
    }),
  });

  arrayColors: Colors[] = ['Gray', 'Green', 'Red', 'Sky', 'Violet', 'Yellow'];

  mapbgColors: Record<Colors, Record<string, boolean>> = {
    Sky: { 'bg-sky-500': true },
    Yellow: { 'bg-yellow-500': true },
    Green: { 'bg-green-500': true },
    Red: { 'bg-red-500': true },
    Violet: { 'bg-violet-500': true },
    Gray: { 'bg-gray-500': true },
    primary: { 'bg-primary-500': true },
    ligth: { 'bg-gray-500': true },
    white: { 'bg-white': true },
  };

  @Output() onClose = new EventEmitter<boolean>();

  get title() {
    return this.boardForm.controls.title;
  }

  get backgroundColor() {
    return this.boardForm.controls.backgroundColor;
  }

  handleForm() {
    if (this.boardForm.invalid) {
      this.boardForm.markAllAsTouched();
      return;
    }

    this.boardSrv
      .createBoard(this.boardForm.getRawValue())
      .subscribe((resp) => {
        console.log(resp);
        this.onClose.emit(false);
        this.router.navigate(['/board', resp.id]);
      });
  }
}
