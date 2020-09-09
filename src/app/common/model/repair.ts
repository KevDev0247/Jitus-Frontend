import {BaseModule} from './base.module';

export class Repair extends BaseModule {
  repairUnit?: string;
  fixDate?: Date;
  projectId?: number;
  contactId?: number;
  name?: string;
  address?: string;
  telno?: string;
  installId?: number;
  status?: number;
  staffId?: number;
}
