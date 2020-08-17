import {BaseModule} from './base.module';

/**
 * The data model class for Organization
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/13
 */
export class Organization extends BaseModule {
  orgNo?: string;
  orgName?: string;
  orgAbr?: string;
  orgType?: string;
  orgStatus?: string;
  orgParentNo?: string;
  sort?: string;
  remark?: string;
  orgFoundDate?: string;
  orgDissolveDate?: string;
}
