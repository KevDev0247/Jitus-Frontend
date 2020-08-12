import {BaseModule} from './base.module';

/**
 * The data model class for Product
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/10
 */
export class Product extends BaseModule {
  title?: string;
  serialNo?: string;
  dept?: string;
  type?: string;
  brand?: string;
  produceTime: Date;
  description?: string;
}
