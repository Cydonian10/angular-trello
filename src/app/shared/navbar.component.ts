import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayLayout } from '@/layouts/overlay.layout';
import { AuthService } from '@/services/auth.service';
import { ProfileStore } from '@/store/profile.store';
import { AsyncPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { BoardFormComponent } from "../pages/boards/components/bord-form.component";
import {  NAV_COLORS } from '@/interfaces/button.interface';
import { ThemeBoarStore } from '@/store/theme.store';
import { BgColorsPipe } from './bg-colors.pipe';

@Component({
    selector: 'app-navbar',
    standalone: true,
    template: `
  <ng-container *ngIf="theme$|async as theme" >
  <div
      [ngClass]="BgColor|bgColors:(theme)"
      class="w-full  text-white p-4 flex  gap-4 items-center  justify-between"
    >
      <div class="flex items-center gap-2">
        <!-- Logo -->
        <div [routerLink]="['/boards']"  routerLinkActive="router-link-active"  class="flex items-center gap-2 cursor-pointer">
          <img class="w-7" src="assets/img/trello.png" alt="logo" />
          <h3 class="font-bold text-2xl">Trello</h3>
        </div>
        <app-button padding="py-2" [color]="theme">
          <span>Workspace</span>
          <img src="assets/icons/arrow_dow.svg" alt="" />
        </app-button>
        <app-button padding="py-2"  [color]="theme">
          <span>Recent</span>
          <img src="assets/icons/arrow_dow.svg" alt="" />
        </app-button>
        <app-button
          cdkOverlayOrigin
          #createOverlay="cdkOverlayOrigin"
          (click)="toogleCreate(true)"
          padding="py-2"
          [color]="theme"
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
          <p>{{ (profile$ | async)?.name | titlecase }}</p>
        </div>

        <div class="mt-4">
          <app-button (click)="logout()" color="Green" padding="py-1">
            Cerrar
          </app-button>
        </div> </layout-overlay
      >s
    </ng-template>

    <!-- Create Overlay Board-->
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="createOverlay"
      [cdkConnectedOverlayOpen]="isOpenCreate"
      (overlayOutsideClick)="toogleCreate(false)"
      [cdkConnectedOverlayOffsetY]="5"
    >
      <layout-overlay (onClose)="toogleCreate(false)">
        <h1 class="font-semibold text-center mb-4">Create Board</h1>
        <app-board-form (onClose)="toogleCreate(false)"> </app-board-form>
      </layout-overlay>
    </ng-template>
    </ng-container>

  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        ButtonComponent,
        OverlayModule,
        OverlayLayout,
        AsyncPipe,
        TitleCasePipe,
        SpinnerComponent,
        BoardFormComponent,
        NgClass,
        BgColorsPipe,
        AsyncPipe,
        NgIf,
        RouterLink
    ]
})
export class NavBarComponent {
  public BgColor = NAV_COLORS
  private authSrv = inject(AuthService);
  private router = inject(Router);
  public profile$ = inject(ProfileStore).user$;

  public theme$ = inject(ThemeBoarStore).getThmeBoard$()

  isOpenMenu: boolean = false;
  isOpenCreate: boolean = false;

  toogleCreate(value: boolean) {
    this.isOpenCreate = value;
  }

  toogleMenu(value: boolean) {
    this.isOpenMenu = value;
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/']);
  }
}
