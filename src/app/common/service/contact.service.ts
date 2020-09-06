import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DOMAIN_SERVER_URL } from '../constants';

/**
 * The service class for Contact module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/16
 */
@Injectable()
export class ContactService {

  constructor(private http: _HttpClient) { }

  getServiceUrl() {
    return DOMAIN_SERVER_URL + '/contact';
  }

  create(contact: any) {
    return this.http.post(this.getServiceUrl() + '/createContact', contact);
  }

  update(contact: any) {
    return this.http.post(this.getServiceUrl() + '/updateContact', contact);
  }

  delete(contactId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteContact?id=' + contactId);
  }

  getDetails(contactId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + contactId);
  }

  getQueryList(param1: string, param2: string, param3: string) {
    return this.http.get(this.getServiceUrl() + '/queryContactList', { param1, param2, param3 });
  }
}
