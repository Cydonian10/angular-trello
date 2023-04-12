import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Colum, Todo } from '@/interfaces/todo.interface';
import { ButtonComponent } from '../../shared/button.component';
import { OverlayLayout } from '../../layouts/overlay.layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { TodoModalComponent } from './components/todo-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgFor,
    DragDropModule,
    ButtonComponent,
    OverlayLayout,
    OverlayModule,
    DialogModule,
  ],
  template: `
    <section class="py-8 px-6 flex items-start gap-4 w-full" cdkDropListGroup>
      <!-- Lista de tareas Container -->
      <div
        *ngFor="let col of colums"
        class="bg-gray-200 w-[300px] snap-center flex-shrink-0 rounded-md p-4 "
      >
        <div class="flex justify-between items-center">
          <header class="font-semibold">{{ col.title }}</header>

          <button
            cdkOverlayOrigin
            #trigger="cdkOverlayOrigin"
            (click)="toogleCreate(trigger, true)"
          >
            <img src="assets/icons/menu_card.svg" alt="" />
          </button>
        </div>

        <!-- Cards Container -->
        <article
          [cdkDropListData]="col.todos"
          class="mt-5 space-y-2 min-h-[15px]"
          cdkDropList
          (cdkDropListDropped)="dropList($event)"
        >
          <!-- Card item -->
          <div
            cdkDrag
            *ngFor="let item of col.todos"
            (click)="openModalTodo(item)"
            class="bg-white w-full min-h-[50px] rounded-md shadow-md p-2"
          >
            <div >
              {{ item.title }}
            </div>
          </div>
        </article>
      </div>

      <div class="flex flex-shrink-0 w-[200px]">
        <app-button (click)="addColum()" padding="py-3">Nueva lista</app-button>
      </div>
    </section>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpen"
      (overlayOutsideClick)="toogleCreate(triggerOrigin, false)"
      [cdkConnectedOverlayOffsetY]="-20"
    >
      <layout-overlay (onClose)="toogleCreate(triggerOrigin, $event)">
        <h1>Create overlay</h1>
      </layout-overlay>
    </ng-template>
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
})
export class BoardPage {
  triggerOrigin: any;
  isOpen = false;

  toogleCreate(trigger: any, value: boolean) {
    this.triggerOrigin = trigger;
    this.isOpen = value;
  }

  colums: Colum[] = [
    {
      title: 'Todos',
      todos: [
        { id: 1, title: 'tarea 1' },
        { id: 2, title: 'tarea 2' },
        { id: 3, title: 'tarea 3' },
      ],
    },
    {
      title: 'Doing',
      todos: [
        { id: 4, title: 'tarea 4' },
        { id: 5, title: 'tarea 5' },
      ],
    },
    {
      title: 'Done',
      todos: [
        { id: 6, title: 'tarea 6' },
        { id: 7, title: 'tarea 7' },
      ],
    },
  ];

  private dialog = inject(Dialog);

  openModalTodo(data:any) {
    const resfModal = this.dialog.open(TodoModalComponent, {
      minWidth: '300',
      data,
      disableClose:true
    });
    resfModal.closed.subscribe((resp) => {
      console.log(resp);
    });
  }

  dropList(event: CdkDragDrop<Todo[]>) {
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
  }

  addColum() {
    this.colums.push({
      title: 'nuevo',
      todos: [],
    });
  }
}
