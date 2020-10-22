import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {BasecodeDetailComponent} from './basecode/basecode-detail.component';
import {BasecodeListComponent} from './basecode/basecode-list.component';
import {LogListComponent} from './log/log-list.component';
import { MenuDetailComponent } from './menu/menu-detail.component';
import { MenuListComponent } from './menu/menu-list.component';
import { MenuComponent } from './menu/menu.component';
import { RoleMenuListComponent } from './menu/role-menu-list.component';
import {MessageListComponent} from './message/message.list.component';
import {OrgListComponent} from './organization/org-list.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleComponent } from './role/role.component';
import { SysRoutingModule } from './sys-routing.module';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserUpdateComponent } from './user/user-update.component';

/**
 * The module that define the components and modules in System section.
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/08/03
 */
const COMPONENTS = [
  UserListComponent,
  UserDetailComponent,
  UserUpdateComponent,
  RoleListComponent,
  RoleComponent,
  MenuComponent,
  MenuDetailComponent,
  MenuListComponent,
  RoleMenuListComponent,
  OrgListComponent,
  BasecodeListComponent,
  BasecodeDetailComponent,
  LogListComponent,
  MessageListComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule { }
