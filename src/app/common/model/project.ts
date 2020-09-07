import {BaseModule} from './base.module';

/**
 * The data model class for Project
 *
 * @Author Kevin Zhijun Wang
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
  deliveryTime?: Date;
  acceptTime?: Date;
  guaranteeType?: string;
  guaranteeMonth?: number;
  guaranteeDueTime?: Date;
  staffId?: number;
  fileId: number;
}
