import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { StaffDetailComponent } from './staff-detail.component';
import { StaffListComponent } from './staff-list.component';
import { StaffRoutingModule } from './staff-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [StaffListComponent, StaffDetailComponent];

@NgModule({
  imports: [SharedModule, StaffRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class StaffModule {}
