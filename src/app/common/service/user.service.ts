import { Injectable } from "@angular/core";
import { DOMAIN_SERVER_URL, USER_URL } from "../constants";
import { _HttpClient } from '@delon/theme';

/**
 * The service class for user module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/07/31
 */
@Injectable()
export class UserService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + USER_URL;
  }

  create(user: any) {
    return this.http.post(this.getServiceUrl() + '/signUp', user)
  }

  delete(userId: number) {
    return this.http.get(this.getServiceUrl() + '/delete', { userId })
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

  updatePassword(userId: number, password: string, newPassword: string) {
    return this.http.get(this.getServiceUrl() + '/updatePassword', {
      userId,
      password,
      newPassword,
    })
  }

  getQueryList(name?: string, email?: string) {
    return this.http.get(this.getServiceUrl() + '/queryUsersList', { name, email })
  }

  updateRole(userId: number, roleId: number) {
    return this.http.get(this.getServiceUrl() + '/bindRole', { userId, roleId })
  }

  login(name?: string, password?: string) {
    return this.http.post(DOMAIN_SERVER_URL + '/login?_allow_anonymous=true', { name, password })
  }
}
