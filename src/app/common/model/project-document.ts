import {BaseModule} from './base.module';

/**
 * The data model class for ProjectDocument
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/10
 */
export class ProjectDocument extends BaseModule {
  operation?: string;
  clientId?: number;
  projectId?: number;
  attachmentId?: number;
  staffId?: number;
}
