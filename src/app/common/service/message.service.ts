import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {DOMAIN_SERVER_URL} from '../constants';

@Injectable()
export class MessageService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/sysMessage';
  }

  create(message: any) {
    return this.http.post(this.getServiceUrl() + '/createSysMessage');
  }

  update(message: any) {
    return this.http.post(this.getServiceUrl() + '/updateSysMessage');
  }

  delete(messageId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteSysMessage');
  }

  detail(messageId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + messageId);
  }

  getQueryList(param1: number, param2: string, param3: number, param4: number) {
    return this.http.get(this.getServiceUrl() + '/querySysMessageList', {
      type: param1,
      content: param2,
      userId: param3,
      isRead: param4,
    });
  }
}
