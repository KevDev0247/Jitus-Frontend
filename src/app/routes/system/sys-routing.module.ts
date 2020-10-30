import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttachmentsDetailComponent} from './attachment/attachment-detail.component';
import {AttachmentListComponent} from './attachment/attachment-list.component';
import {BasecodeDetailComponent} from './basecode/basecode-detail.component';
import {BasecodeListComponent} from './basecode/basecode-list.component';
import {LogListComponent} from './log/log-list.component';
import { MenuDetailComponent } from './menu/menu-detail.component';
import { MenuListComponent } from './menu/menu-list.component';
import {MessageListComponent} from './message/message.list.component';
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
      { path: 'list', component: UserListComponent },
      { path: 'detail', component: UserDetailComponent },
      { path: 'update', component: UserUpdateComponent },
    ],
  },
  {
    path: 'role',
    children: [{ path: 'list', component: RoleListComponent}],
  },
  {
    path: 'menu',
    children: [
      { path: 'list', component: MenuListComponent },
      { path: 'detail', component: MenuDetailComponent },
    ],
  },
  {
    path: 'basecode',
    children: [
      { path: 'list', component: BasecodeListComponent },
      { path: 'detail', component: BasecodeDetailComponent },
    ],
  },
  {
    path: 'org',
    children: [{ path: 'list', component: OrgListComponent }],
  },
  {
    path: 'log',
    children: [{ path: 'list', component: LogListComponent }],
  },
  {
    path: 'message',
    children: [{ path: 'list', component: MessageListComponent }],
  },
  {
    path: 'attachment',
    children: [
      { path: 'list', component: AttachmentListComponent },
      { path: 'detail', component: AttachmentsDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule { }
