import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData, XlsxService } from '@delon/abc/public_api';
import { NzMessageService, NzModalService } from 'ng-zorro-antd/ng-zorro-antd.module';
import { User } from '../../../common/model/User';
import { UserService } from '../../../common/service/userService';

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

  data_xslx_change: any;
  data: any[] = [];
  data_xslx: any[] = [];
  selectedProvince = 'Zhejiang';
  provinceData = ['Zhejiang', 'Jiangsu'];
  loading = false;
  user: User = new User();
  total = 20;

  status = [
    { id: 0, text: 'normal', value: false, type: 'success', checked: false},
    { id: 1, text: 'deleted', value: false, type: 'error', checked: false},
  ];

  userId = 0;
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
            this.router.navigate(
              ['/user/user-update'], {queryParams: { user: item.id}})
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

  item = [
    { name: "Apple", type: "fruit"},
    { name: "Carrot", type: "vegetable"},
    { name: "Orange", type: "fruit"}
  ];
  droppedItems = []
  onItemDrop(e: any) {
    // get the dropped data here
    this.droppedItems.push(e.dragData);
  }

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

  download() {
    const data = [this.columns.map(i => i.title)];
    this.data_xslx.forEach(i => data.push(this.columns.map(c => i[c.index as string])));
    this.xlsx.export({
      sheets: [
        {
          data,
          name: 'sheet name',
        }
      ],
    });
  }

  approval() { }

  url () {
    this.isVisible = true;
  }

  change(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.xlsx.import(file).then(response => (this.data_xslx_change = response));
  }

  showModal(): void {
    this.isVisible = true;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  handleOk(): void {
    console.log('Button OK clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button Cancel clicked!');
    this.isVisible = false;
  }

  getChildEvent(index: any) {
    if (index === 1) {
      this.isVisible = false;
    }
  }

  JumpToItem() {
    console.log("Item>>>>>>1");
  }

  nzEvent(event: any): void {
    console.log(">>>>tree>>>>", event)
  }
}
