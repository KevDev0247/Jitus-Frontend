import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleListComponent} from './role/role-list.component';
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
  },
  {
    path: 'role',
    children: [{ path: 'role-list', component: RoleListComponent}],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule { }
