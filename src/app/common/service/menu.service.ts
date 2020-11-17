import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for menu module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/07
 */
@Injectable()
export class MenuService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + 'menu';
  }

  create(menu: any) {
    return this.http.post(this.getServiceUrl() + '/createMenu', menu);
  }

  batchCreate(menuList: any) {
    return this.http.post(this.getServiceUrl() + 'createBatch', menuList);
  }

  update(menu: any) {
    return this.http.post(this.getServiceUrl() + '/updateMenu', menu);
  }

  delete(menuId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteMenu?menuId=' + menuId);
  }

  getDetails(menuId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + menuId);
  }

  getQueryList(parentId: number, text: string) {
    return this.http.get(this.getServiceUrl() + '/queryMenusList', { parentId, text })
  }

  getRoleMenuList(roleId: number) {
    return this.http.get(this.getServiceUrl() + '/getRoleMenuList', { roleId })
  }

  getFirstMenuList() {
    return this.http.get(this.getServiceUrl() + '/firstMenuList');
  }

  getMainMenuList(userId: number, isShow: number) {
    return this.http.get(this.getServiceUrl() + '/getMainMenus?userId=' + userId + '&isShow=' + isShow);
  }

  addMainMenu(umids: any) {
    return this.http.get(this.getServiceUrl() + '/addMainMenu', umids);
  }
}
