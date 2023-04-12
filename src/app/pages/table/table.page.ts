import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { ProductService } from '@/services/product.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { DataSourceProducts } from './data/data-source';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {  debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CdkTableModule, NgClass,AsyncPipe,ReactiveFormsModule],
  template: `
    <section>
      <h1 class="font-bold text-2xl pb-10">Table Products</h1>

      <input [formControl]="input" type="search" class="py-2 px-3 ring-1 ring-gray-300 rounded-md mb-3 outline-none">

      <div class="relative overflow-x-auto shadow-md sm:rounded-2xl">
        <table
          cdk-table
          [dataSource]="dataSource"
          class="w-full text-sm text-left text-gray-500"
        >
          <tr
            class="text-xs text-gray-700 uppercase bg-gray-50 "
            cdk-header-row
            *cdkHeaderRowDef="columns"
          ></tr>

          <!-- [ngClass]="{'bg-red-500': row.price < 100}" -->
          <tr
            class="bg-white border-b hover:bg-gray-50"
            cdk-row
            *cdkRowDef="let row; columns: columns"
          ></tr>

          <tr
            class="text-md text-gray-700 uppercase bg-gray-200 "
            cdk-footer-row
            *cdkFooterRowDef="columns"
          ></tr>

          <!-- Id Column -->
          <ng-container cdkColumnDef="id">
            <th class="px-6 py-3" cdk-header-cell *cdkHeaderCellDef>Id</th>
            <td class="px-6 py-4" cdk-cell *cdkCellDef="let element">
              {{ element.id }}
            </td>
            <th class="px-6 py-3" cdk-footer-cell *cdkFooterCellDef=""></th>
          </ng-container>

          <!-- Id Image -->
          <ng-container cdkColumnDef="image">
            <th class="px-6 py-3" cdk-header-cell *cdkHeaderCellDef>Title</th>
            <td class="px-6 py-4" cdk-cell *cdkCellDef="let element">
              <img class="w-20" [src]="element.images[0]" alt="" />
            </td>
            <th class="px-6 py-3" cdk-footer-cell *cdkFooterCellDef=""></th>
          </ng-container>

          <!-- Id Title -->
          <ng-container cdkColumnDef="title">
            <th
              class="px-6 py-4"
              class="px-6 py-3"
              cdk-header-cell
              *cdkHeaderCellDef
            >
              Title
            </th>
            <td class="px-6 py-4" cdk-cell *cdkCellDef="let element">
              {{ element.title }}
            </td>
            <th class="px-6 py-3" cdk-footer-cell *cdkFooterCellDef=""></th>
          </ng-container>

          <!-- Id Price -->
          <ng-container cdkColumnDef="price">
            <th
              class="px-6 py-4"
              class="px-6 py-3"
              cdk-header-cell
              *cdkHeaderCellDef
            >
              Price
            </th>
            <td class="px-6 py-4" cdk-cell *cdkCellDef="let element">
              {{ element.price }}
            </td>
            <th class="px-6 py-3" cdk-footer-cell *cdkFooterCellDef="">
              {{ total  }}
            </th>
          </ng-container>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  private productSrv = inject(ProductService);
  public columns: string[] = ['id', 'image', 'title', 'price'];
  public dataSource = new DataSourceProducts()
  public input = new FormControl("",{nonNullable:true})

  public total = 0

  ngOnInit(): void {
    this.productSrv.getProducts().subscribe(
      resp => {
        this.dataSource.init(resp)
        this.total = this.dataSource.getTotal()
      }
    );

    this.input.valueChanges.pipe(debounceTime(300)).subscribe(resp => {
      this.dataSource.find(resp)
    })
  }


}
