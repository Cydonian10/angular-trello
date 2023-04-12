import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

@Component({
  selector: 'app-table',
  standalone:true,
  imports:[CdkTableModule],
  template: `
    <div>
      <h1>Table</h1>
    </div>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}