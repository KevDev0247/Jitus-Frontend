import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {SysRoutingModule} from './sys-routing.module';
import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserUpdateComponent } from './user/user-update.component';

const COMPONENTS = [
  UserListComponent,
  UserDetailComponent,
  UserUpdateComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule { }
