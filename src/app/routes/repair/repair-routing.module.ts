import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ContractListComponent} from './contract/contract-list.component';
import {EvaluateDetailComponent} from './evaluate/evaluate-detail.component';
import {ProgressComponent} from './progress/progress.component';
import {RepairDetailComponent} from './repair-detail.component';
import {RepairListComponent} from './repair-list.component';
import {RepairRecordDetailComponent} from './repair-record/repair-record-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: null },
  { path: 'list', component: RepairListComponent },
  { path: 'detail', component: RepairDetailComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'evaluate', component: EvaluateDetailComponent },
  {
    path: 'contract',
    children: [
      { path: 'list', component: ContractListComponent },
      { path: 'detail', component: ContractDetailComponent },
    ],
  },
  {
    path: 'record',
    children: [{ path: 'detail', component: RepairRecordDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairRoutingModule {}
