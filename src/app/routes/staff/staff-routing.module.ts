import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDetailComponent } from './staff-detail.component';
import { StaffListComponent } from './staff-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StaffListComponent },
  { path: 'detail', component: StaffDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
