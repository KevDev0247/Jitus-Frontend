import { Injectable } from "@angular/core";
import { DOMAIN_SERVER_URL } from "../constants";
import { _HttpClient } from '@delon/theme';

@Injectable()
export class LogService {
  constructor(private http: _HttpClient) {

  }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/sysLog';
  }

  delete(sysLogId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteLog?sysLogId=' + sysLogId)
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryLogList', { fromTime: param1, toTime: param2 })
  }
}
