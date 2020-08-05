import {BaseModule} from './base.module';

export class User extends BaseModule {
  password?: string;
  name?: string;
  email?: string;
}
