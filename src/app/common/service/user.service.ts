import { Injectable } from "@angular/core";
import { DOMAIN_SERVER_URL, USER_URL } from "../constants";
import { _HttpClient } from '@delon/theme';

/**
 * The service class for user module
 *
 * @Author: Kevin Zhijun Wang
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

    updatePasswd(userId: number, password: string, newPasswd: string) {
        return this.http.get(this.getServiceUrl() + '/updatePassword', { userId, passwd: password, newPassword: newPasswd })
    }

    getQueryList(name?: string, email?: string) {
        return this.http.get(this.getServiceUrl() + '/queryUsersList', { name, email })
    }

    updateRole(userId: number, roleId: number) {
        return this.http.get(this.getServiceUrl() + '/updateRole', { userId, roleId })
    }

    login(name?: string, password?: string) {
        return this.http.post(DOMAIN_SERVER_URL + '/login?_allow_anonymous=true', { name, password })
    }
}
