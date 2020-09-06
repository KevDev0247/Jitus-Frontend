import {BaseModule} from './base.module';

/**
 * The data model class for Contract
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/09/06
 */
export class Contract extends BaseModule {
  signPlace?: string;
  startDate?: string;
  endDate?: string;
  projectId?: string;
  clientId?: string;
  content?: string;
  pattern?: string;
  name?: string;
  address?: string;
  telno?: string;
  signDate?: string;
  signmanId?: string;
  status?: string;
  price?: string;
}
