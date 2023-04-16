import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { IList } from '@/interfaces/board.interface';
import { ListService } from '@/services/list.service';
import { ButtonComponent } from '@/shared/button.component';

@Component({
  selector: 'app-list-options',
  standalone: true,
  template: `
    <div>
      <h1>Options</h1>
      <p>list {{ listId }}</p>
      <app-button color="ligth" padding="py-2" (click)="removeList()">
        Remove list
      </app-button>
    </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export class ListOptionsComponent {
  private listSrv = inject(ListService);
  @Input() listId: number = 0;
  @Input() lists: IList[] = [];
  @Output() onClose = new EventEmitter<boolean>();

  removeList() {
    this.listSrv.remove(this.listId).subscribe((resp) => {
      const index = this.lists.findIndex((item) => item.id === this.listId);
      this.lists.splice(index, 1);
      this.onClose.emit(false);
    });
  }
}
