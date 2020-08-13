import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for Organization
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/13
 */
@Injectable()
export class OrganizationService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/org';
  }

  create(organization: any) {
    return this.http.post(this.getServiceUrl() + '/createOrg', organization);
  }

  update(organization: any) {
    return this.http.post(this.getServiceUrl() + '/updateOrg', organization);
  }

  delete(organizationId: number) {
    return this.http.get(this.getServiceUrl() + '/delete?organizationId=' + organizationId);
  }

  getQueryList(orgName: string, orgAbr: string) {
    return this.http.get(this.getServiceUrl() + '/queryOrgList', { orgName, orgAbr });
  }

  getList() {
    return this.http.get(this.getServiceUrl() + '/getOrgList', { orgId: 0 })
  }
}
