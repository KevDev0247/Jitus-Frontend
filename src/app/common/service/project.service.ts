import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for project module
 *
 * @Author Kevin Zhijun Wang, Yonggang Su
 * Created on 2020/07/31
 */
@Injectable()
export class ProjectService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/project';
  }

  create(project: any) {
    return this.http.post(this.getServiceUrl() + '/createProject', project);
  }

  update(project: any) {
    return this.http.post(this.getServiceUrl() + '/updateProject', project);
  }

  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteProject', { userId })
  }

  getQueryList(contractId?: string, clientId?: string, name?: string) {
    return this.http.get(this.getServiceUrl() + '/queryProjectsList', { contractId, clientId, name });
  }

  getDetails(id: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + id)
  }
}
