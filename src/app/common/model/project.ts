import {BaseModule} from './base.module';

/**
 * The data model class for Project
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/08/10
 */
export class Project extends BaseModule {
  name?: string;
  contractId: number;
  description?: string;
  address?: string;
  clientId?: number;
  contractStartTime?: string;
  contractEndTime?: string;
  deliveryTime?: string;
  acceptTime?: string;
  guaranteeType?: string;
  guaranteeMonth?: number;
  guaranteeDueTime?: string;
  staffId?: number;
  fileId: number;
}
