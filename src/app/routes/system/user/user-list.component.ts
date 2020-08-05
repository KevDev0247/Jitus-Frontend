import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData, XlsxService } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { User } from '../../../common/model/user';
import { UserService } from '../../../common/service/user.service';

/**
 * The component class that define and control the views of the user list.
 *
 * @Author Kevin Zhijun Wang
 * @version 2020.0803
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .wrapper{
        width: 20%;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class UserListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    name: '',
    email: '',
  };

  data: any[] = [];
  loading = false;
  user: User = new User();
  total = 20;

  status = [
    { id: 0, text: 'normal', value: false, type: 'success', checked: false},
    { id: 1, text: 'deleted', value: false, type: 'error', checked: false},
  ];

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'id', index: 'id'},
    { title: 'name', index: 'name'},
    { title: 'email', index: 'email'},
    {
      title: 'status',
      index: 'isDelete',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter: any, record: any) => (
          record.isDelete === filter.id
        ),
      }
    },
    {
      title: 'createTime',
      index: 'createTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.createTime - b.createTime,
      },
    },
    {
      title: 'operation',
      buttons: [
        {
          text: 'view',
          click: (item: any) => {
            this.router.navigate(['/sys/user/user-update'], {queryParams: { user: item.id}})
          }
        },
        {
          text: 'delete',
          click: (item: any) => {
            this.remove(item.id)
          },
        },
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;
  isVisible = false;
  isCollapsed = false;
  theme = true;

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private xlsx: XlsxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.userService.getQueryList(this.query.name, this.query.email)
      .subscribe((response: any) => {
        this.data = response.data;
        this.data.map(i => {
          const statusItem = this.status[+i.isDelete];
          if (statusItem) {
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          }
        });
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      })
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox;
        this.totalCallNo = this.selectedRows
          .reduce((total, cv) => total + cv.callNo, 0);
        break;
      case 'filter':
        console.log(">>>> filter");
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
        this.userService.create(this.user)
          .subscribe(() => this.getData());
      }
    });
  }

  remove(userId: number) {
    this.userService.delete(userId)
      .subscribe((response) => {
        if (response.data) {
          this.messageService.success(response.message);
          this.getData();
          this.st.clearCheck();
        } else {
          this.messageService.error(response.message);
        }
      });
  }

  reset() {
    // wait for the form reset finish
    this.query.name = '';
    this.query.email = '';
    this.getData();
  }

  url () {
    this.isVisible = true;
  }

  approval() { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
