import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { ButtonComponent } from '@/shared/button.component';
import { InputComponent } from '@/shared/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IList } from '@/interfaces/board.interface';
import { CardService } from '@/services/card.service';
import { BoardService } from '@/services/board.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  template: `
    <div *ngIf="!(showForm$ | async)">
      <app-button (click)="this.toogleForm(true)" color="ligth" padding="py-2"
        >
      <div class="flex justify-start gap-2 w-full">
        <img src="assets/icons/add.svg" alt="add">
        <span>Add Card</span>
      </div>
      </app-button
      >
    </div>

    <div *ngIf="showForm$ | async">
      <app-input [control]="cardInput"></app-input>
      <div class="flex mt-3 gap-3">
        <app-button (click)="handleForm()" padding="py-1"
          >
          Añadir tarjeta
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
export class CardFormComponent {
  private cardSrv = inject(CardService)
  private boardSrv = inject(BoardService)

  @Input() list:IList = {
    id: 1,
    position: 0,
    title: '',
    cards: [],
    boardId:0,
  }
  public showForm$ = new BehaviorSubject(false);
  public cardInput = new FormControl('', { nonNullable: true });

  toogleForm(value: boolean) {
    this.showForm$.next(value);
  }

  handleForm() {
    this.cardSrv.createCard({
      listId:Number(this.list.id),
      position: this.boardSrv.getPositionNewCard(this.list.cards),
      title: this.cardInput.getRawValue(),
      description:"bla bla bla"
    }).subscribe({
      next:(resp) => {
        this.list.cards.push(resp)
        this.showForm$.next(false)
        console.log(this.list.cards);
      }
    })
  }
}
