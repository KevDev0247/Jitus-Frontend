import {BaseModule} from './base.module';

export class ProFollow extends BaseModule {
  operation?: string;
  type?: string;
  contactDate?: Date;
  nextDate?: Date;
  contactId?: number;
  title?: string;
  content?: string;
  staffId?: number;
}
