import {BaseModule} from './base.module';

/**
 * The data model class for CtaFollow
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
export class CtaFollow extends BaseModule {
  operation?: string;
  type?: string;
  contactDate?: Date;
  nextDate?: Date;
  clientId?: number;
  contactId?: number;
  staffId?: number;
}
