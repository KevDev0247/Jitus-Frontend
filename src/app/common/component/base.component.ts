import { NzModalService } from 'ng-zorro-antd';

export abstract class BaseComponent {

    constructor(public modalSrv: NzModalService) {

    }
    showDeleteConfirm(id: number, content?: string): void {
        if (!content) {
            content = ''
        }
        this.modalSrv.confirm({
            nzTitle: '你确定要删除?',
            // nzContent: '<b color="red">此操作不可逆 </b>',
            nzContent: '<b>' + content + '</b> <br/> <font color="red";><b>此操作不可逆</b> </font>',
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                console.log('OK')
                this.remove(id)

            },
            nzCancelText: '取消',
            nzOnCancel: () => console.log('Cancel')
        });
    }
    remove(id?: number) { }
}
