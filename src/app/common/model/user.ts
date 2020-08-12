import {BaseModule} from './base.module';

/**
 * The data model class for Menu
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/02
 */
export class User extends BaseModule {
  password?: string;
  name?: string;
  email?: string;
}
