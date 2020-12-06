import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { NzUploadModule } from 'ng-zorro-antd';
import {ProductDetailComponent} from './product-detail.component';
import {ProductListComponent} from './product-list.component';
import {ProductRoutingModule} from './product-routing.module';

const COMPONENTS = [];

const COMPONENTS_NOROUNT = [ProductListComponent, ProductDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
    NzUploadModule,
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProductModule {}
