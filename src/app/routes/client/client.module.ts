import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {ClientDetailComponent} from './client-detail.component';
import {ClientListComponent} from './client-list.component';
import {ClientRoutingModule} from './client-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [ClientListComponent, ClientDetailComponent];

@NgModule({
  imports: [SharedModule, ClientRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ClientModule { }
