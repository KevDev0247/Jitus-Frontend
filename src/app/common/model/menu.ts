import {BaseModule} from './base.module';

export class Menu extends BaseModule {
  parentId?: number;
  text?: string;
  i18n?: string;
  link?: string;
  icon?: string;
  orderNumber?: number;
}
