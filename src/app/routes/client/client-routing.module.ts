import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientDetailComponent} from './client-detail.component';
import {ClientListComponent} from './client-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ClientListComponent },
  { path: 'detail', component: ClientDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
