import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailComponent } from './menu/menu-detail.component';
import { MenuListComponent } from './menu/menu-list.component';
import {OrgListComponent} from './organization/org-list.component';
import { RoleListComponent } from './role/role-list.component';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserUpdateComponent } from './user/user-update.component';

/**
 * The module that controls the routing of System section.
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/08/03
 */
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
  },
  {
    path: 'menu',
    children: [
      { path: 'menu-list', component: MenuListComponent },
      { path: 'menu-detail', component: MenuDetailComponent },
    ],
  },
  {
    path: 'org',
    children: [{ path: 'org-list', component: OrgListComponent }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule { }
