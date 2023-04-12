import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from './link.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LinkComponent, CdkAccordionModule,NgIf,NgClass],
  template: `
    <nav class="w-[280px] border-r-[1px] outlet">
      <div class="p-1 flex flex-col gap-[0.5px] py-5">
        <!-- Links -->
        <app-link link="/boards" padding="py-2">
          <div class="flex items-center gap-1">
            <img src="assets/icons/trello.svg" alt="trello" />
            <span>Bords</span>
          </div>
        </app-link>
        <app-link link="/table" padding="py-2">
          <div class="flex items-center gap-1">
            <img src="assets/icons/template.svg" alt="trello" />
            <span>Templates</span>
          </div>
        </app-link>
        <app-link link="/home" padding="py-2">
          <div class="flex items-center gap-1">
            <img src="assets/icons/home.svg" alt="trello" />
            <span>Home</span>
          </div>
        </app-link>
      </div>
      <!-- Accordion Elements -->
      <cdk-accordion>
        <cdk-accordion-item #accordionMenu="cdkAccordionItem">
          <button
            class="py-3 px-6 w-full text-left bg-gray-100 hover:bg-gray-300"
            type="button"
            (click)="accordionMenu.toggle()"
          >
            <div class="flex justify-between">
              <span class="font-semibold">Gabriel</span>
              <ng-container *ngIf="!accordionMenu.expanded;else up">
                <img src="assets/icons/arrow_dow_dark.svg" alt="" />
              </ng-container>
              <ng-template #up>
               <img src="assets/icons/arrow_up_dark.svg" alt="" />
              </ng-template>
            </div>
          </button>
          <div [style.display]="accordionMenu.expanded ? '' : 'none'" >
              <ul class=" bg-gray-50">
                <li class="py-2 pl-10 hover:bg-slate-100">Home</li>
                <li class="py-2 pl-10 hover:bg-slate-100">Tareas</li>
                <li class="py-2 pl-10 hover:bg-slate-100">Members</li>
                <li class="py-2 pl-10 hover:bg-slate-100">Settings</li>
              </ul>
          </div>
        </cdk-accordion-item>
      </cdk-accordion>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    ` 
      .outlet {
        min-height: calc(100vh - 73px);
      }
  
    `,
  ],
})
export class SidebarComponent {}
