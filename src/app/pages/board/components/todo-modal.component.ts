import { ICard } from '@/interfaces/board.interface';
import { CardService } from '@/services/card.service';
import { ButtonComponent } from '@/shared/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  template: `
    <div class="relative p-4 rounded-md bg-white outline-none">
      <!-- Title -->
      <div class="flex items-start justify-between">
        <h2 class="font-bold mb-4 flex gap-3">
          <img src="assets/icons/tiitle.svg" alt="title" />
          <input type="text" [formControl]="titleInput" />
        </h2>
        <button
          (click)="updateCard()"
          class="mr-10 hover:bg-gray-200 p-1 rounded-full active:scale-95 transition-transform"
        >
          <img src="assets/icons/edit.svg" alt="edit" />
        </button>
      </div>

      <div class="flex justify-between items-start gap-5">
        <!-- Description -->
        <div class="w-full">
          <h2 class="font-bold mb-4 flex gap-3">
            <img src="assets/icons/tiitle.svg" alt="title" />
            <span>Description</span>
          </h2>

          <div class="ml-10">
            <app-button
              *ngIf="!showDescription; else showDescriptionForm"
              color="ligth"
              (click)="showDescriptonToggle(true)"
            >
              <div class="flex justify-start text-sm w-full">
                Añadir una description mas detallada
              </div>
            </app-button>

            <!-- Form description -->
            <ng-template #showDescriptionForm>
              <div>
                <textarea
                  class="ring-2 mt-1 rounded-md p-2 w-full outline-none"
                ></textarea>

                <div class="w-[200px] flex gap-3">
                  <app-button color="primary" padding="py-2">
                    <span class="text-sm">Añadir</span>
                  </app-button>
                  <app-button
                    (click)="showDescriptonToggle(false)"
                    color="white"
                    padding="py-2"
                  >
                    <span class="text-sm">Cancelar</span>
                  </app-button>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
        <!-- Acciones -->

        <div class="w-[250px] flex flex-col gap-2">
          <h3 class="font-semibold text-sm mb-1">Acciones</h3>

          <app-button color="ligth" padding="py-1">
            <div class="w-full flex justify-start gap-2 items-center">
              <img class="w-5" src="assets/icons/remove.svg" alt="remove" />
              <span>Eliminar</span>
            </div>
          </app-button>
          <app-button color="ligth" padding="py-1">
            <div class="w-full flex justify-start gap-2 items-center">
              <img class="w-5" src="assets/icons/remove.svg" alt="remove" />
              <span>Eliminar</span>
            </div>
          </app-button>
          <app-button (click)="removeCard()" color="ligth" padding="py-1">
            <div class="w-full flex justify-start gap-2 items-center">
              <img class="w-5" src="assets/icons/remove.svg" alt="remove" />
              <span>Eliminar</span>
            </div>
          </app-button>
        </div>
      </div>

      <button class="absolute top-3 right-3" (click)="dialogRef.close()">
        <img src="assets/icons/close.svg" alt="close" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardModalComponent implements OnInit {
  private cardSrv = inject(CardService);
  public showDescription = false;

  constructor(
    public dialogRef: DialogRef<{ type: string; id: number; data: any }>,
    @Inject(DIALOG_DATA) public data: ICard
  ) {}

  titleInput = new FormControl('', { nonNullable: true });

  ngOnInit() {
    console.log(this.data);
    this.titleInput.setValue(this.data.title);
  }

  showDescriptonToggle(value: boolean) {
    this.showDescription = value;
  }

  removeCard() {
    this.cardSrv.removeCard(this.data.id).subscribe((resp) => {
      this.dialogRef.close({ type: 'remove', id: this.data.id, data: resp });
    });
  }

  updateCard() {
    this.cardSrv
      .updateCard(this.data.id, {
        description: 'bla bla bl desde el forntend',
        title: this.titleInput.getRawValue(),
      })
      .subscribe((resp) => {
        // console.log(resp);
        // this.dialogRef.close({ type: 'updkte', id: this.data.id, data: resp });
        //this.dialogRef.disableClose;
      });
  }
}
