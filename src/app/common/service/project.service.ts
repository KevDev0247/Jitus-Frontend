import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

export class ProjectService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/project';
  }

  create(project: any) {
    return this.http.post(this.getServiceUrl() + '/createProject', project);
  }

  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteProject', { userId })
  }

  getQueryList(contractId?: string, clientId?: string, name?: string) {
    return this.http.get(this.getServiceUrl() + '/queryProjectsList', { contractId, clientId, name });
  }
}
