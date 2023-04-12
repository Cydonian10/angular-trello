import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from '@/pages/login/login.page';
import { BoardsPage } from '@/pages/boards/boards.page';
import { BoardPage } from '@/pages/board/board.page';
import { TableComponent } from '@/pages/table/table.page';

import { BoardsLayout } from '@/layouts/boards.layout';
import { BoardLayout } from '@/layouts/board.layout';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path:"boards",
    component:BoardsLayout,
    children:[
      {
        path:"",
        component:BoardsPage
      },
      {
        path:"table",
        component:TableComponent
      }
    ]
  },
  {
    path:"board",
    component:BoardLayout,
    children:[
      {
        path:"",
        component:BoardPage
      }
    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
