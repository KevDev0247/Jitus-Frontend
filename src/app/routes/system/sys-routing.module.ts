import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserUpdateComponent } from './user/user-update.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'user-detail', component: UserDetailComponent },
      { path: 'user-update', component: UserUpdateComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule { }
