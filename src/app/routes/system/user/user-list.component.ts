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
 * Created on 2020/08/03
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
    `,
  ],
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
  userId = 0;

  status = [
    { id: 0, text: 'normal', value: false, type: 'success', checked: false},
    { id: 1, text: 'deleted', value: false, type: 'error', checked: false},
  ];

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'ID', index: 'id'},
    { title: 'Name', index: 'name'},
    { title: 'Email', index: 'email'},
    {
      title: 'Status',
      index: 'isDelete',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter: any, record: any) => record.isDelete === filter.id,
      }
    },
    {
      title: 'Create Time',
      index: 'createTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.createTime - b.createTime,
      },
    },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/sys/user/update'], {queryParams: { user: item.id}})
          }
        },
        {
          text: 'Assign',
          click: (item: any) => {
            this.userId = item.id;
            this.showModal();
          }
        },
        {
          text: 'Delete',
          click: (item: any) => {
            this.remove(item.id);
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
        this.data = response.list;
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
      nzTitle: 'New User',
      nzContent: templateRef,
      nzOnOk: () => {
        this.loading = true;
        if (!this.user.name || !this.user.password) {
          this.messageService.error('Please fill in necessary information');
          return;
        }
        this.userService.create(this.user)
          .subscribe(() => this.getData());
      }
    });
  }

  remove(userId: number) {
    this.userService.delete(userId).subscribe(response => {
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

  showModal(): void {
    this.isVisible = true;
  }

  getChildEvent(index: any) {
    if (index === 1) {
      const message = 'Role binding successful';
      this.isVisible = false;
      this.messageService.success(message);
    }
  }

  approval() { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
