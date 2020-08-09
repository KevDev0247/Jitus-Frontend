import {BaseModule} from './base.module';

/**
 * The data model class for Menu
 *
 * @Author Yonggang Su
 * Created on 2020/08/07
 */
export class Menu extends BaseModule {
  parentId?: number;
  text?: string;
  i18n?: string;
  link?: string;
  icon?: string;
  orderNumber?: number;
}
