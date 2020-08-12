import {BaseModule} from './base.module';

/**
 * The data model class for Contact
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
export class Contact extends BaseModule {
  name?: string;
  dept?: string;
  profession?: string;
  telNo?: string;
  email?: string;
  qq?: string;
  wechat?: string;
}
