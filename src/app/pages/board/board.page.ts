import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/services/board.service';
import { ButtonComponent } from '@/shared/button.component';
import { CardService } from '@/services/card.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ICard, IList, UpdateCardDto } from '@/interfaces/board.interface';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { OverlayLayout } from '@/layouts/overlay.layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerComponent } from '@/shared/spinner.component';
import { TodoModalComponent } from './components/todo-modal.component';
import { CardFormComponent } from './components/card-form.component';
import { ListFormComponent } from './components/list-form.component';
import { ThemeBoarStore } from '@/store/theme.store';
import { ListOptionsComponent } from './components/list-options.component';

@Component({
  selector: 'app-board',
  standalone: true,
  template: `
    <ng-container *ngIf="board$ | async as board">
      <h1 class="font-bold text-2xl p-5">
        {{ board.title | titlecase }}
      </h1>
      <section class="py-2 px-6 flex items-start gap-4 w-full" cdkDropListGroup>
        <div class="text-center w-full absolute top-10 right-10">
          <app-spinner></app-spinner>
        </div>

        <!-- Lista de tareas Container -->
        <div
          *ngFor="let list of board.list"
          class="bg-gray-200 w-[300px] snap-center flex-shrink-0 rounded-md p-4"
        >
          <div class="flex justify-between items-center">
            <header class="font-semibold">{{ list.title }}</header>

            <button
              cdkOverlayOrigin
              #trigger="cdkOverlayOrigin"
              (click)="toogleCreate(trigger, true, list.id.toString())"
            >
              <img src="assets/icons/menu_card.svg" alt="" />
            </button>
          </div>

          <!-- Cards Container -->
          <article
            [cdkDropListData]="list.cards"
            class="mt-5 space-y-2 min-h-[20px]"
            [id]="list.id.toString()"
            cdkDropList
            (cdkDropListDropped)="dropList($event)"
          >
            <!-- Card item -->
            <div
              cdkDrag
              *ngFor="let item of list.cards"
              (click)="openModalTodo(item)"
              class="bg-white w-full min-h-[50px] rounded-md shadow-md p-2 cursor-pointer"
            >
              <div>{{ item.title }} - {{ item.position }}</div>
            </div>

            <!-- Button add cardd-->
          </article>
          <div class="mt-2">
            <app-card-form [list]="list"></app-card-form>
          </div>
        </div>
        <div class="flex flex-shrink-0 w-[300px]">
          <app-list-form
            [lists]="board.list"
            [boardId]="board.id"
          ></app-list-form>
        </div>

        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="triggerOrigin"
          [cdkConnectedOverlayOpen]="isOpen"
          (overlayOutsideClick)="toogleCreate(triggerOrigin, false)"
          [cdkConnectedOverlayOffsetY]="-20"
        >
          <layout-overlay (onClose)="toogleCreate(triggerOrigin, $event)">
            <app-list-options
              (onClose)="toogleCreate(triggerOrigin, $event)"
              [lists]="board.list"
              [listId]="(listId$ | async)!"
            ></app-list-options>
          </layout-overlay>
        </ng-template>
      </section>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    DragDropModule,
    ButtonComponent,
    OverlayLayout,
    OverlayModule,
    DialogModule,
    AsyncPipe,
    NgIf,
    TitleCasePipe,
    SpinnerComponent,
    CardFormComponent,
    ListFormComponent,
    ListOptionsComponent,
  ],
})
export class BoardPage implements OnDestroy {
  private themeBoard = inject(ThemeBoarStore);
  private route = inject(ActivatedRoute);
  private boardSrv = inject(BoardService);
  private cardSrv = inject(CardService);
  public listId$ = new BehaviorSubject<number>(0);

  public board$ = this.route.paramMap.pipe(
    map((resp) => resp.get('id')!),
    switchMap((id) =>
      this.boardSrv.getBoard(Number(id)).pipe(
        tap((resp) => {
          this.themeBoard.setThemeBoard(resp.backgroundColor);
        })
      )
    )
  );

  triggerOrigin: any;
  isOpen = false;

  toogleCreate(trigger: any, value: boolean, listId?: string) {
    this.triggerOrigin = trigger;
    this.isOpen = value;
    if (listId) {
      this.listId$.next(Number(listId));
    }
  }

  private dialog = inject(Dialog);

  openModalTodo(data: any) {
    const resfModal = this.dialog.open(TodoModalComponent, {
      minWidth: '300',
      data,
      disableClose: true,
    });
    resfModal.closed.subscribe((resp) => {
      console.log(resp);
    });
  }

  dropList(event: CdkDragDrop<ICard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const position = this.boardSrv.getPosition(
      event.container.data,
      event.currentIndex
    );
    event.container.data[event.currentIndex].position = position;
    const listId = Number(event.container.id);
    const { id } = event.container.data[event.currentIndex];
    this.cardSrv.updateCard(id, { listId, position }).subscribe((resp) => {
      // console.log(resp);
      // console.log(event.container.data);
    });
  }

  // private updateCard(id:ICard["id"],changes:UpdateCardDto){
  // return  this.cardSrv.updateCard(id,changes).subscribe( resp => {
  //     console.log(resp);
  //   })
  // }

  ngOnDestroy(): void {
    this.themeBoard.setThemeBoard('primary');
  }
}
