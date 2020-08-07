import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

/**
 * The service class for menu module
 *
 * @Author Kevin Zhijun Wang
 * @version 2020.0807
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

  detail(menuId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + menuId);
  }

  getQueryList(parentId: number, text: string) {
    return this.http.get(this.getServiceUrl() + '/queryMenusList', { parentId, text })
  }

  getAverList(roleId: number) {
    return this.http.get(this.getServiceUrl() + 'getAverList', { roleId })
  }

  getFirstMenuList() {
    return this.http.get(this.getServiceUrl() + '/firstMenuList');
  }
}
