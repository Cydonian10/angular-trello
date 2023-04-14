import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonComponent } from '@/shared/button.component';
import { InputComponent } from '@/shared/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IList } from '@/interfaces/board.interface';
import { BoardService } from '@/services/board.service';
import { ListService } from '@/services/list.service';
import { ThemeBoarStore } from '@/store/theme.store';

@Component({
  selector: 'app-list-form',
  standalone: true,
  template: `
    <div *ngIf="!(showForm$ | async)">
      <app-button (click)="this.toogleForm(true)" [color]="(theme$|async)!" padding="py-2"
        >
      <div class="flex justify-start items-center gap-1 w-full">
        <img src="assets/icons/add.svg" alt="add">
        <span class="text-sm">Add Another List</span>
      </div>
      </app-button
      >
    </div>

    <div *ngIf="showForm$ | async">
      <app-input [control]="listInput"></app-input>
      <div class="flex mt-3 gap-3">
        <app-button (click)="handleForm()" padding="py-1"
          >
          Añadir Lista
          </app-button
        >
        <button (click)="toogleForm(false)" class="w-9">
          <img src="assets/icons/close.svg" alt="" />
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
})
export class ListFormComponent {
  private boardSrv = inject(BoardService)
  private listSrv = inject(ListService)
  public theme$ = inject(ThemeBoarStore).getThmeBoard$()

  @Input() lists:IList[] = []
  @Input() boardId:number = 1

  public showForm$ = new BehaviorSubject(false);
  public listInput = new FormControl('', { nonNullable: true });

  toogleForm(value: boolean) {
    this.showForm$.next(value);
  }

  handleForm() {
    this.listSrv.create({
      boardId:this.boardId,
      position:this.boardSrv.getPositonNewList(this.lists),
      title: this.listInput.getRawValue()
    }).subscribe( resp => {
      this.lists.push({...resp,cards:[]})
      this.showForm$.next(false)
    })
  }
}
