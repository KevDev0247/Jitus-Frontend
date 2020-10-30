import { Injectable } from '@angular/core';
import { DOMAIN_SERVER_URL } from '../constants';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AttachmentsService {

  constructor(private http: _HttpClient) { }

  getServiceUrl(): string {
    return DOMAIN_SERVER_URL + '/sysAttachments';
  }

  create(attachments: any) {
    return this.http.post(this.getServiceUrl() + '/createSysAttachments', attachments);
  }

  update(attachments: any) {
    return this.http.post(this.getServiceUrl() + '/updateSysAttachments', attachments);
  }

  delete(attachmentsId: number) {
    return this.http.get(this.getServiceUrl() + '/deleteSysAttachments?attachmentsId=' + attachmentsId);
  }

  detail(attachmentsId: number) {
    return this.http.get(this.getServiceUrl() + '/detail?id=' + attachmentsId);
  }

  getQueryList(name: string, type: string, userId: number) {
    return this.http.get(this.getServiceUrl() + '/queryStsAttachmentsList', { name, type, userId });
  }
}
