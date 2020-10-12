import {BaseModule} from './base.module';

/**
 * The data model class for Basecode
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/10/12
 */
export class Accessory extends BaseModule {
  type?: number;
  name?: string;
  code?: string;
  spec?: string;
  model?: string;
  unit?: string;
  count?: number;
  safeCount?: number;
  status?: number;
  isReturn?: number;
}
