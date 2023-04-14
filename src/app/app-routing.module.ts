import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from '@/pages/login/login.page';
import { BoardsPage } from '@/pages/boards/boards.page';
import { BoardPage } from '@/pages/board/board.page';
import { TableComponent } from '@/pages/table/table.page';

import { BoardsLayout } from '@/layouts/boards.layout';
import { BoardLayout } from '@/layouts/board.layout';
import { RegisterPage } from '@/pages/register/register.page';
import { AuthGuard } from '@/guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate:[RedirectGuard]
  },
  {
    path:"register",
    component:RegisterPage,
    canActivate:[RedirectGuard]
  },
  {
    path:"",
    component:BoardsLayout,
    canActivate:[AuthGuard],
    children:[
      {
        path:"boards",
        component:BoardsPage
      },
      {
        path:"table",
        component:TableComponent
      }
    ]
  },
  {
    path:"board/:id",
    component:BoardLayout,
    canActivate:[AuthGuard],
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
