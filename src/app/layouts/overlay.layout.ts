import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'layout-overlay',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white py-4 px-6 rounded-lg shadow-xl relative min-w-[250px] max-w-[400px]">
      <button class="absolute top-2 right-2 hover:bg-gray-400 hover:rounded-full" (click)="closeOverlay()">
        <img  src="assets/icons/close.svg" alt="close">
      </button>
      <ng-content></ng-content>
    </div>
  `,
})
export class OverlayLayout {

    @Output() onClose = new EventEmitter<boolean>()

    closeOverlay() {
        this.onClose.emit(false)
    }
}
