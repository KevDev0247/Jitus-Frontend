import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {NzUploadModule} from 'ng-zorro-antd';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectListComponent} from './project-list.component';
import {ProjectRoutingModule} from './project-routing.module';

/**
 * The module that define the components and modules in Project section.
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/08/11
 */
const COMPONENTS = [];
const COMPONENTS_NOROUNT = [ProjectListComponent, ProjectDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    NzUploadModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProjectModule {}
