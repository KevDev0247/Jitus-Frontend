import {BaseModule} from './base.module';

/**
 * The data model class for CtaFollowup
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
export class CtaFollowup extends BaseModule {
  operation?: string;
  type?: string;
  contactDate?: Date;
  nextDate?: Date;
  clientId?: number;
  contactId?: number;
  staffId?: number;
}
