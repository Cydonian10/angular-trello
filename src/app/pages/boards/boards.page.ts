import { BoardService } from '@/services/board.service';
import { ProfileService } from '@/services/profile.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerComponent } from '@/shared/spinner.component';
import { RouterLink } from '@angular/router';
import { BoardCardComponent } from './components/board-card.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  template: `
    <section class="py-8 px-2">
      <!-- Title -->
      <div class="flex items-center text-xl font-bold">
        <img class="w-8" src="assets/icons/watch.svg" alt="" />
        <h1>Recently viewed</h1>
      </div>

      <!-- Cards boards -->
      <div class="text-center">
        <app-spinner></app-spinner>
      </div>
      <ng-container *ngIf="boards$ | async as boards">
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
         <app-board-card *ngFor="let item of boards" [data]="item" ></app-board-card>
        </div>
      </ng-container>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe, NgIf, SpinnerComponent,BoardCardComponent ,RouterLink],
})
export class BoardsPage {
  private profileSrv = inject(ProfileService);

  public boards$ = this.profileSrv.getMeBoards();


}
