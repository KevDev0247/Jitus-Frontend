import { Injectable } from '@angular/core';
import { DOMAIN_SERVER_URL } from '../constants';
import { _HttpClient } from '@delon/theme';

/**
 * The service class for product module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/07/31
 */
@Injectable()
export class ProductService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/product';
  }

  create(product: any) {
    return this.http.post(this.getServiceUrl() + '/create', product);
  }

  update(product: any) {
    return this.http.post(this.getServiceUrl() + '/update', product);
  }

  delete(productId: number) {
    return this.http.get(this.getServiceUrl() + '/delete?productId=' + productId);
  }

  detail(productId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + productId);
  }

  getQueryList(param1: string, param2: string, param3: string) {
    return this.http.get(this.getServiceUrl() + '/queryList', { spec: param1, serialNo: param2, type: param3 });
  }
}
