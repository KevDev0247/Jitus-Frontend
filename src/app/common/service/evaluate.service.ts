import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for Evaluate module that send out Http requests to the backend
 *
 * @Author Yonggang Su
 * 2020/09/16
 */
@Injectable()
export class EvaluateService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/evaluate';
  }

  create(evaluate: any) {
    return this.http.post(this.getServiceUrl() + '/createEvaluate', evaluate)
  }

  update(evaluate: any) {
    return this.http.post(this.getServiceUrl() + '/updateEvaluate', evaluate)
  }

  delete(evaluateId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteEvaluate?evaluateId=' + evaluateId)
  }

  detail(evaluateId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + evaluateId)
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryEvaluateList', { param1, param2 })
  }
}
