import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for Client module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/11
 */
@Injectable()
export class ClientService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/client';
  }

  create(client: any) {
    return this.http.post(this.getServiceUrl() + '/createClient', client)
  }

  update(client: any) {
    return this.http.post(this.getServiceUrl() + '/updateClient', client);
  }

  delete(clientId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteClient' + clientId);
  }

  getDetail(clientId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + clientId);
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryClientList', { param1, param2})
  }

  getOptionList(param: string) {
    return this.http.get(this.getServiceUrl() + '/optionList', { info: param });
  }
}
