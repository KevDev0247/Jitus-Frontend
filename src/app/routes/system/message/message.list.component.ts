import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc/public_api';
import {NzMessageService, NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {Message} from '../../../common/model/message';
import {MessageService} from '../../../common/service/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message.list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements OnInit {

  q: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
    param3: '',
    param4: '',
  };

  message: Message = new Message();
  data: any[] = [];
  selectRows: STData[] = [];

  loading = false;
  expandForm = false;
  totalCallNo = 0;
  total = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox'},
    { title: 'Type', index: 'type'},
    { title: 'Content', index: 'content'},
    { title: 'User', index: 'userId'},
    {
      title:'Operations',
      buttons: [
        {
          text: 'Details',
          click: (item: any) => {
            this.router.navigate(['/message/detail'], { queryParams: { id: item.id } });
          },
        },
        {
          text: 'Delete',
          click: (item: any) => {
            this.showDeleteConfirm(item.id);
          }
        }
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private sysMessageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.sysMessageService
      .getQueryList(this.q.param1, this.q.param2, this.q.param3, this.q.param4)
      .subscribe((res: any) => {
        this.data = res.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectRows = event.checkbox!;
        this.totalCallNo = this.selectRows.reduce((total, cv) => total + cv.callNo, 0);
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.sysMessageService.create(this.message)
          .subscribe(() => this.getData());
      },
    });
  }

  create() {
    this.router.navigate(['/message/detail']);
  }

  remove(id: number) {
    this.sysMessageService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  reset() {
    // wait form reset updated finished
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.q.param4 = '';
    this.getData();
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red;">This operation is irreversible</b>',
      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
