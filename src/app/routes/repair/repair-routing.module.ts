import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractDetailComponent} from './contract/contract-detail.component';
import {ContractListComponent} from './contract/contract-list.component';

const routes: Routes = [
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
