import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild, TemplateRef
} from '@angular/core';
import { Router } from '@angular/router';
import { STColumn } from '@delon/abc/public_api';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Role} from '../../../common/model/role';
import { RoleService } from '../../../common/service/role.service';
import { UserService } from '../../../common/service/user.service';

/**
 * The component class that define and control the views of the roles list.
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/05
 */
interface ItemData {
  id: number;
  roleName: string;
  remark: string;
  createTime: string;
}
@Component({
  selector: 'app-role-list',
  templateUrl: 'role-list.component.html',
})
export class RoleListComponent implements OnInit {

  @Input() userId = 0;
  @Output() childEvent = new EventEmitter<any>();
  roleId = 0;
  total = 20;

  role: Role = new Role();
  displayDataList: ItemData[] = [];
  allDataList: ItemData[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  selectOption: [];

  loading = false;
  expandForm = false;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  isAuthDetailsVisible = false;
  isAuthAssignmentsVisible = false;

  query: any = {
    roleName: '',
    remark: '',
  }

  @ViewChild('st', { static: true}) stColumn: STColumn;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'ID', index: 'id'},
    { title: 'Role Name', index: 'roleName'},
    { title: 'Remark', index: 'remark'},
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
            this.isAuthDetailsVisible = true;
            this.roleId = +item.id;
          },
        },
        {
          text: 'Assign',
          click: (item: any) => {
            this.isAuthAssignmentsVisible = true;
            this.roleId = +item.id;
          },
        },
      ],
    }
  ];

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService
  ) {
    this.getData();
  }

  getData() {
    this.roleService.getList(this.query.roleName, this.query.remark)
      .subscribe((response: any) => {
        this.allDataList = response.list;
        this.loading = false;
    })
  }

  loadCurrentPageDataChange($event: ItemData[]): void {
    this.displayDataList = $event;
  }

  refreshStatus($event: any): void {
    Object.keys(this.mapOfCheckedId).forEach(item => {
      if ($event !== +item) {
        this.mapOfCheckedId[item] = false;
      }
    })
  }

  checkAll(value: boolean): void {
    this.displayDataList.forEach(item => (this.mapOfCheckedId[item.id] = value))
  }

  ngOnInit(): void { }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: 'Create',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        if (!this.role.roleName || ! this.role.remark) {
          this.messageService.error('Please fill in necessary information');
          return;
        }
        this.roleService.create(this.role).subscribe(() => this.getData());
      },
    });
  }

  handleData() {
    Object.keys(this.mapOfCheckedId).forEach(item => {
      if (this.mapOfCheckedId[item]) {
        this.roleId = +item;
      }
    });
    this.userService.updateRole(this.userId, this.roleId)
      .subscribe((response: any) => {
        if (response.data) {
          this.childEvent.emit(1);
        }
      });
  }

  reset() {
    this.query.roleName = '';
    this.query.remark = '';
    this.getData();
  }

  getChildEvent(index: any) {
    if (index === 1) {
      this.isAuthAssignmentsVisible = false;
    }
    if (index === 2) {
      this.isAuthDetailsVisible = false;
    }
    this.roleId = 0;
  }

  handleAssignmentsCancel(): void {
    console.log('Button cancel clicked!');
    this.isAuthAssignmentsVisible = false;
    this.roleId = 0;
  }

  handleDetailsCancel(): void {
    console.log('Button cancel clicked!');
    this.isAuthDetailsVisible = false;
    this.roleId = 0;
  }
}
