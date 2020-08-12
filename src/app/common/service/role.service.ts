import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for role module
 *
 * @Author Yonggang Su
 * Created on 2020/08/05
 */
@Injectable()
export class RoleService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/role';
  }

  getList(roleName: string, remark: string) {
    return this.http.get(this.getServiceUrl() + '/getRolesList', { roleName, remark });
  }

  addMenu(role_id: number, menu_id: number) {
    return this.http.get(this.getServiceUrl() + '/bindMenu', { roleId: role_id, menuId: menu_id});
  }

  deleteMenu(role_id: number, menu_id: number) {
    return this.http.get(this.getServiceUrl() + '/unbindMenu', { roleId: role_id, menuId: menu_id});
  }
}
