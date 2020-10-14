import { Injectable } from '@angular/core';
import { DOMAIN_SERVER_URL } from '../constants';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AccessoryService {
  constructor(private http: _HttpClient) {}

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/accessory';
  }

  create(accessory: any) {
    return this.http.post(this.getServiceUrl() + '/createAccessory', accessory);
  }

  update(accessory: any) {
    return this.http.post(this.getServiceUrl() + '/updateAccessory', accessory);
  }

  delete(accessoryId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteAccessory?accessoryId=' + accessoryId);
  }

  detail(accessoryId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + accessoryId);
  }

  getQueryList(param1: string, param2: string, param3: number) {
    return this.http.get(this.getServiceUrl() + '/queryAccessoryList', { name: param1, code: param2, type: param3 });
  }
}
