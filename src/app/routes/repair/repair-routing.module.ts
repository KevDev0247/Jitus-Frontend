import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ContractListComponent} from './contract/contract-list.component';
import {RepairDetailComponent} from './repair-detail.component';
import {RepairListComponent} from './repair-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: null },
  { path: 'list', component: RepairListComponent },
  { path: 'detail', component: RepairDetailComponent },
  {
    path: 'contract',
    children: [
      { path: 'list', component: ContractListComponent},
      { path: 'detail', component: ContractDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairRoutingModule {}
