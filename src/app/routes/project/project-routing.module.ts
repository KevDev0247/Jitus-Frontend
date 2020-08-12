import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectListComponent} from './project-list.component';

/**
 * The module that controls the routes of the Project section.
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/08/11
 */
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProjectListComponent },
  { path: 'detail', component: ProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
