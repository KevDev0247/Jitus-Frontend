import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL, USER_URL} from '../constants';

/**
 * The service class for users
 *
 * @author Kevin Zhijun Wang
 * @version 2020.0731
 */
@Injectable()
export class UserService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + USER_URL;
  }

  create(user: any) {
    return this.http.post(this.getServiceUrl() + '/signUp', user);
  }

  update(user: any) {
    return this.http.post(this.getServiceUrl() + '/update' + user);
  }

  updatePassword(userId: number, password: string, newPassword: string) {
    return this.http.get(this.getServiceUrl() + '/updatePassword', {userId, password, newPassword});
  }

  updateRole(userId: number, roleId: number) {
    return this.http.get(this.getServiceUrl() + '/updateRole', {userId, roleId});
  }

  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/delete', {userId});
  }

  getQueryList(name?: string, email?: string) {
    return this.http.get(this.getServiceUrl() + '/queryUsersList', {name, email});
  }

  detail(id: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + id);
  }

  detailByName(name: string) {
    return this.http.get(this.getServiceUrl() + 'detailByName?name=' + name);
  }

  login(name?: string, password?: string) {
    return this.http.post(this.getServiceUrl() + '/login?_allow_anonymous', {name, password});
  }
}
