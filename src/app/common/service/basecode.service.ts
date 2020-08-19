import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DOMAIN_SERVER_URL } from '../constants';

/**
 * The service class for Basecode module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/11
 */
@Injectable()
export class BasecodeService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/basecode';
  }

  create(basecode: any) {
    return this.http.post(this.getServiceUrl() + '/createBasecode', basecode);
  }

  update(basecode: any) {
    return this.http.post(this.getServiceUrl() + '/updateBasecode', basecode);
  }

  delete(basecodeId: number) {
    return this.http.get(this.getServiceUrl() + '/delete?basecodeId=', basecodeId);
  }

  getDetail(basecodeId: number) {
    return this.http.get(this.getServiceUrl() + 'detail?id=', basecodeId);
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryBasecodeList', { param1, param2 });
  }
}
