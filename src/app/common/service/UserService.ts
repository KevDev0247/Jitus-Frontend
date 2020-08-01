/**
 * Created by syg on 5/31/18.
 */
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DOMAIN_SERVER_URL, USER_URL } from '../constants';
@Injectable()
export class UserService {
  constructor(private http: _HttpClient) {

  }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + USER_URL;
  }

  create(user: any) {
    return this.http.post(this.getServiceUrl() + '/create', user)
  }
  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/delete', { userId: userId })
  }
  update(user: any) {
    return this.http.post(this.getServiceUrl() + '/update', user)
  }
  detail(id: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + id)
  }
  detailByName(name: string) {
    return this.http.get(this.getServiceUrl() + '/detailByName?name=' + name)
  }
  updatePasswd(userId: number, password: string, newPasswd: string) {
    return this.http.get(this.getServiceUrl() + '/updatePasswd', { userId: userId, passwd: password, newPasswd: newPasswd })
  }
  getQueryList(name?: string, email?: string) {
    return this.http.get(this.getServiceUrl() + '/queryList', { name: name, email: email })
  }

  updateRole(userId: number, roleId: number) {
    return this.http.get(this.getServiceUrl() + '/updateRole', { userId: userId, roleId: roleId })
  }
  login(name?: string, password?: string) {
    return this.http.post(this.getServiceUrl() + '/login?_allow_anonymous=true', { name: name, password: password })
  }
}
