import {BaseModule} from './base.module';

/**
 * The data model class for Staff
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/10
 */
export class Staff extends BaseModule {
  scode?: string;
  name?: string;
  dept?: string;
  company?: string;
  email?: string;
  telno?: string;
  address?: string;
}
