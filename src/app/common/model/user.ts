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
  orgId?: string;
  roleId?: string;
  profession?: string;
  telno?: number;
  qq?: number;
  wechat?: number;
  scode?: number;
  realName?: number;
  company?: number;
  address?: number;
}
