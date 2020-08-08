import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MenuDetailComponent } from './menu/menu-detail.component';
import { MenuListComponent } from './menu/menu-list.component';
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
 * @version 2020.0807
 */
const COMPONENTS = [
  UserListComponent,
  UserDetailComponent,
  UserUpdateComponent,
  RoleListComponent,
  RoleComponent,
  MenuDetailComponent,
  MenuListComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule { }
