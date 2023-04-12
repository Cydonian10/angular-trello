import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="py-8 px-2">
      <!-- Title -->
      <div class="flex items-center text-xl font-bold">
        <img class="w-8" src="assets/icons/watch.svg" alt="">
        <h1>Recently viewed</h1>
      </div>

      <!-- Cards boards -->
     <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div *ngFor="let item of [1,2,3,4,5,6]">
        <div class="bg-primary-500 rounded-md h-20 w-full p-3 text-white shadow">
          {{item}}
        </div>
       </div>
     </div>

    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPage {}
