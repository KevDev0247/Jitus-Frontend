import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for Contract module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/09/06
 */
@Injectable()
export class ContractService {

  constructor(private http: _HttpClient) { }

  getServiceUrl() {
    return DOMAIN_SERVER_URL + '/contract';
  }

  create(contract: any) {
    return this.http.post(this.getServiceUrl() + '/createContract', contract);
  }

  update(contract: any) {
    return this.http.post(this.getServiceUrl() + '/updateContract', contract);
  }

  delete(contractId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteContract?contractId=' + contractId);
  }

  detail(contractId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + contractId);
  }

  getQueryList(param1: number, param2: number, param3: number) {
    return this.http.get(this.getServiceUrl() + '/queryContractList', { status: param1, content: param2, name: param3 });
  }
}
