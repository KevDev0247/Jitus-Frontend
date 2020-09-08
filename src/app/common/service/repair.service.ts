import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

@Injectable()
export class RepairService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/repair';
  }

  create(project: any) {
    return this.http.post(this.getServiceUrl() + '/createRepair', project);
  }

  update(project: any) {
    return this.http.post(this.getServiceUrl() + '/updateRepair', project);
  }

  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteRepair', { userId })
  }

  getDetails(id: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + id)
  }

  getQueryList(contractId?: string, clientId?: string, name?: string) {
    return this.http.get(this.getServiceUrl() + '/queryRepairList', { contractId, clientId, name });
  }
}
