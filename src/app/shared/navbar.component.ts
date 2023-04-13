import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayLayout } from '@/layouts/overlay.layout';
import { AuthService } from '@/services/auth.service';
import { ProfileStore } from '@/store/profile.store';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { SpinnerComponent } from "./spinner.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
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

        <div class="py-2">
          <div class="text-center">
            <app-spinner></app-spinner>
          </div>
          <p>{{(profile$|async)?.name | titlecase }}</p>
        </div>

      <div class="mt-4">
      <app-button (click)="logout()" color="success" padding="py-1" >
          Cerrar
        </app-button>
      </div>
      </layout-overlay>s
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
    imports: [RouterOutlet, ButtonComponent, OverlayModule, OverlayLayout, AsyncPipe, TitleCasePipe, SpinnerComponent]
})
export class NavBarComponent {
  private authSrv = inject(AuthService)
  private router = inject(Router)
  public profile$ = inject(ProfileStore).user$ 

  isOpenMenu: boolean = false;
  isOpenCreate: boolean = false;

  toogleCreate(value: boolean) {
    this.isOpenCreate = value;
  }

  toogleMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(["/"])
  }
}
