import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ContractListComponent} from './contract/contract-list.component';
import {RepairRoutingModule} from './repair-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [ContractListComponent, ContractDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    RepairRoutingModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RepairModule { }