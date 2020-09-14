import {BaseModule} from './base.module';

/**
 * The data model class for RepairRecord
 *
 * @Author Yonggang Su
 * Created on 2020/09/14
 */
export class RepairRecord extends BaseModule {
  repairId?: number;
  description?: string;
  dcode?: string;
  content?: string;
  ccode?: string;
  repairmanId?: number;
}
