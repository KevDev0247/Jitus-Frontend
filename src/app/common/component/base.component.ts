import {NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';

export abstract class BaseComponent {

  protected constructor(public modalService: NzModalService) { }

  showDeleteConfirm(id: number, content?: string): void {
    if (!content) {
      content = '';
    }
    this.modalService.confirm({
      nzTitle: 'Are you sure about deletion?',
      nzContent: '<b>' + content + '</b> <br/> <font color="red"><b>This action is irreversible</b> </font>',
      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      }
    });
  }
  remove(id?: number) { }
}
