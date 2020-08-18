import {BaseModule} from './base.module';

/**
 * The data model class for Role
 *
 * @Author Yonggang Su
 * Created on 2020/08/18
 */
export class Role extends BaseModule {
  type?: number;
  roleName?: string;
  remark?: string;
}
