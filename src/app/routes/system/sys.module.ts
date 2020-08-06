import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RoleListComponent } from './role/role-list.component';
import { RoleComponent } from './role/role.component';
import { SysRoutingModule } from './sys-routing.module';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserUpdateComponent } from './user/user-update.component';

const COMPONENTS = [
  UserListComponent,
  UserDetailComponent,
  UserUpdateComponent,
  RoleListComponent,
  RoleComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule { }
