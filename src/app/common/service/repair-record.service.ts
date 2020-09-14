import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for RepairRecord module that send out Http requests to the backend
 *
 * @Author Yonggang Su
 * 2020/09/14
 */
@Injectable()
export class RepairRecordService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/repairRecord';
  }

  create(repairRecord: any) {
    return this.http.post(this.getServiceUrl() + '/createRepairRecord', repairRecord);
  }

  update(repairRecord: any) {
    return this.http.post(this.getServiceUrl() + '/updateRepairRecord', repairRecord);
  }

  delete(repairRecordId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteRepairRecord', { userId: repairRecordId })
  }

  getDetails(repairRecordId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?repairRecordId=' + repairRecordId)
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryRepairRecordList', { param1, param2 });
  }
}
