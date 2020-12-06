import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {User} from '../../common/model/user';
import { ClientService } from '../../common/service/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 0,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
  };

  client: User = new User();
  data: any[] = [];
  selectedRows: STData[] = [];

  loading = false;
  expandForm = false;
  totalCallNo = 0;

  roleIds = [
    {
      id: 7,
      text: 'Commercial Client',
      type: 'info'
    },
    {
      id: 8,
      text: 'Individual Client',
      type: 'info'
    },
    {
      id: 9,
      text: 'Corporate Client',
      type: 'info'
    },
  ];

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Name', index: 'name' },
    { title: 'Phone', index: 'telno' },
    { title: 'Area', index: 'area' },
    { title: 'Address', index: 'address' },
    {
      title: 'Client Type',
      index: 'roleId',
      render: 'roleIds',
      filter: {
        menus: this.roleIds,
        fn: (filter: any, record: any) => record.roleId === filter.id,
      },
    },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/client/detail'], { queryParams: { id: item.id } });
          },
        },
        {
          text: 'Delete',
          click: (item: any) => {
            this.showDeleteConfirm(item.id);
          },
        },
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private clientService: ClientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.clientService.getQueryList(this.query.param1, this.query.param2)
      .subscribe((response: any) => {
        this.data = response.data;
        this.data.map(i => {
          const statusItem = this.roleIds[+i.roleId - 7];
          if (statusItem) {
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          }
        });
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  add(templateRef: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: templateRef,
      nzOnOk: () => {
        this.loading = true;
        this.clientService.create(this.client)
          .subscribe(() => this.getData());
      },
    })
  }

  create() {
    this.router.navigate(['/client/detail']);
  }

  remove(id: number) {
    this.clientService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.getData();
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Sure',
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
