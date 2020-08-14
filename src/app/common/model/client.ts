import {BaseModule} from './base.module';

/**
 * The data model class for Client
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
export class Client extends BaseModule {
  name?: string;
  telNo?: string;
  area?: string;
  address?: string;
  remark?: string;
  orgId?: string;
}
