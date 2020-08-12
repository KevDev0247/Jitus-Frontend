import {BaseModule} from './base.module';

/**
 * The data model class for ClientProduct
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
export class ClientProduct extends BaseModule {
  clientId?: number;
  productId?: number;
  place?: string;
  sales?: string;
  installTime?: Date;
  guaranteeType?: string;
  guaranteeDueTime?: Date;
  keepDueTime?: Date;
  inspectDueTime?: Date;
}
