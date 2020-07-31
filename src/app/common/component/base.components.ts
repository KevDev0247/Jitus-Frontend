import { NzModalService } from 'ng-zorro-antd';

export abstract class BaseComponent {

  constructor(public modalService: NzModalService) { }

  showDeleteConfirm(id: number, content?: string): void {
    if (!content) {
      content = '';
    }
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b>' + content + '</b> <br/> <font color="red"><b>This operation cannot be reversed</b></font>',

      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },

      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  remove(id?: number) { }
}
