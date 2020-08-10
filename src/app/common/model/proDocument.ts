import {BaseModule} from './base.module';

/**
 * The data model class for ProDocument
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/10
 */
export class ProDocument extends BaseModule {
  operation?: string;
  clientId?: number;
  projectId?: number;
  attachmentId?: number;
  staffId?: number;
}
