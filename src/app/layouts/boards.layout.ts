import { NavBarComponent } from '@/shared/navbar.component';
import { SidebarComponent } from '@/shared/sidebar.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout-boards',
  standalone: true,
  imports: [SidebarComponent, NavBarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>

    <div class="container m-auto w-full flex">
      <app-sidebar></app-sidebar>

      <div class="w-full p-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    ` :host {
      display:block;
    }
      .outlet {
        min-height: calc(100vh - 73px);
      }
    `,
  ],
})
export class BoardsLayout {}
