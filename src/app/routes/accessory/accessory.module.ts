import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {AccessoryDetailComponent} from './accessory-detail.component';
import {AccessoryListComponent} from './accessory-list.component';
import {AccessoryRoutingModule} from './accessory-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [AccessoryListComponent, AccessoryDetailComponent];

@NgModule({
  imports: [SharedModule, AccessoryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AccessoryModule { }
