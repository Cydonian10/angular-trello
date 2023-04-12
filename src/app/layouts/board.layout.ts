import { NavBarComponent } from '@/shared/navbar.component';
import { SidebarComponent } from '@/shared/sidebar.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'layout-board',
  standalone: true,
  imports: [SidebarComponent, NavBarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>

    <div class="w-full flex items-start">
      <div class="w-[300px] min-h-[calc(100vh_-_80px)] border-r p-3">
        <h1>Sidebar</h1>
      </div>

      <div class="scroll-pl-4 scroll-pr-4 snap-x overflow-x-scroll w-full min-h-[calc(100vh_-_73px)]">
        <router-outlet></router-outlet>
      </div>
    </div>
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    :host {
      display:block;
      overflow-y: hidden;
    } 
    `,
  ],
})
export class BoardLayout {}
