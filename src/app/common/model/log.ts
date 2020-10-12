import {BaseModule} from './base.module';

/**
 * The data model class for Basecode
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/10/12
 */
export class Log extends BaseModule {
  userName?: string;
  operation?: string;
  method?: string;
  params?: string;
  ip?: string;
}
