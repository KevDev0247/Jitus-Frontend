import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STColumn} from '@delon/abc/public_api';
import {RoleService} from '../../../common/service/role.service';
import {UserService} from '../../../common/service/user.service';

interface ItemData {
  id: number;
  roleName: string;
  authority: string;
  createTime: string;
}

/**
 * The component class that define and control the views of the roles list.
 *
 * @Author Kevin Zhijun Wang
 * @version 2020.0805
 */
@Component({
  selector: 'app-role-list',
  templateUrl: 'role-list.component.html',
})
export class RoleListComponent implements OnInit {

  @Input() userId = 0;
  @Output() childEvent = new EventEmitter<any>();
  roleId = 0;
  total = 20;

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
    authority: '',
  }

  @ViewChild('st', { static: true}) stColumn: STColumn;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'ID', index: 'id'},
    { title: 'Role Name', index: 'roleName'},
    { title: 'Authority', index: 'authority'},
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
          text: 'Authority Details',
          click: (item: any) => {
            this.isAuthDetailsVisible = true;
            this.roleId = +item.id;
          },
        },
        {
          text: 'Authority Assignments',
          click: (item: any) => {
            this.isAuthAssignmentsVisible = true;
            this.roleId = +item.id;
          },
        },
      ],
    }
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService) {

    this.getData();
  }

  getData() {
    this.roleService.getList().subscribe((response: any) => {
        this.allDataList = response.list;
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
    this.query.authority = '';
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
