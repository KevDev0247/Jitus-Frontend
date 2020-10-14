import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {NzTableModule} from 'ng-zorro-antd';
import {PipeModule} from '../../common/pipe/pipe.module';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ContractListComponent} from './contract/contract-list.component';
import {EvaluateDetailComponent} from './evaluate/evaluate-detail.component';
import {ProgressComponent} from './progress/progress.component';
import {RepairDetailComponent} from './repair-detail.component';
import {RepairListComponent} from './repair-list.component';
import {RepairRecordDetailComponent} from './repair-record/repair-record-detail.component';
import {RepairRoutingModule} from './repair-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [
  RepairListComponent,
  RepairDetailComponent,
  RepairRecordDetailComponent,
  EvaluateDetailComponent,
  ContractListComponent,
  ContractDetailComponent,
  ProgressComponent,
];

@NgModule({
  imports: [
    SharedModule,
    RepairRoutingModule,
    NzTableModule,
    PipeModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RepairModule { }
