import {BaseModule} from './base.module';

export class Message extends BaseModule {
  ptype?: number;
  type?: number;
  content?: string;
  userId?: number;
  isRead?: number;
  createUserId?: number;
}
