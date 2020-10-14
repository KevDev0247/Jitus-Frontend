import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessoryDetailComponent} from './accessory-detail.component';
import {AccessoryListComponent} from './accessory-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AccessoryListComponent },
  { path: 'detail', component: AccessoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoryRoutingModule { }
