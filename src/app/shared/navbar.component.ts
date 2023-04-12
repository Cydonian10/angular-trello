import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayLayout } from '@/layouts/overlay.layout';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, OverlayModule, OverlayLayout],
  template: `
    <div
      class="w-full bg-primary-600 text-white p-4 flex  gap-4 items-center  justify-between"
    >
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <img class="w-7" src="assets/img/trello.png" alt="logo" />
          <h3 class="font-bold text-2xl">Trello</h3>
        </div>
        <app-button padding="py-2">
          <span>Workspace</span>
          <img src="assets/icons/arrow_dow.svg" alt="" />
        </app-button>
        <app-button padding="py-2">
          <span>Recent</span>
          <img src="assets/icons/arrow_dow.svg" alt="" />
        </app-button>
        <app-button
          cdkOverlayOrigin
          #createOverlay="cdkOverlayOrigin"
          (click)="toogleCreate(true)"
          padding="py-2"
        >
          <span>Create</span>
          <img src="assets/icons/arrow_dow.svg" alt="" />
        </app-button>
      </div>

      <nav class="flex items-center gap-4">
        <!-- Button Image-->
        <button
          cdkOverlayOrigin
          #menuOverlay="cdkOverlayOrigin"
          (click)="toogleMenu(true)"
          class="rounded-full bg-primary-500 overflow-hidden active:scale-95 transition-transform"
        >
          <img
            class="w-10 h-10 object-cover"
            src="assets/img/undraw_cat_epte.svg"
            alt=""
          />
        </button>
      </nav>
    </div>

    <!-- Menu Overlay -->
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="menuOverlay"
      [cdkConnectedOverlayOpen]="isOpenMenu"
      (overlayOutsideClick)="toogleMenu(false)"
      [cdkConnectedOverlayOffsetY]="5"
    >
      <layout-overlay (onClose)="toogleMenu(false)">
        <h1>Menu overlay</h1>
      </layout-overlay>
    </ng-template>

    <!-- Create Overlay -->
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="createOverlay"
      [cdkConnectedOverlayOpen]="isOpenCreate"
      (overlayOutsideClick)="toogleCreate(false)"
      [cdkConnectedOverlayOffsetY]="5"
    >
      <layout-overlay (onClose)="toogleCreate(false)">
        <h1>Create overlay</h1>
      </layout-overlay>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  isOpenMenu: boolean = false;
  isOpenCreate: boolean = false;

  toogleCreate(value: boolean) {
    this.isOpenCreate = value;
  }

  toogleMenu(value: boolean) {
    this.isOpenMenu = value;
  }
}
