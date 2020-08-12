import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for Staff module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/07/31
 */
export class StaffService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/staff';
  }

  create(staff: any) {
    return this.http.post(this.getServiceUrl() + '/createStaff', staff);
  }

  update(staff: any) {
    return this.http.post(this.getServiceUrl() + '/updateStaff', staff);
  }

  delete(staffId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteStaff?id=' + staffId);
  }

  getDetails(staffId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + staffId);
  }

  getQueryList(param1: string, param2: string) {
    return this.http.get(this.getServiceUrl() + '/queryStaffList', {param1, param2})
  }
}
