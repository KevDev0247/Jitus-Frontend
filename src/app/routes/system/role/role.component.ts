import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {RoleService} from '../../../common/service/role.service';
import {UserService} from '../../../common/service/user.service';

/**
 * The component class that define and control the views of the role.
 *
 * @Author Yonggang Su
 * Created on 2020/08/08
 */
interface ItemData {
  id: number;
  roleName: string;
  remark: string;
  createTime: string;
}
@Component({
  selector: 'app-role',
  templateUrl: 'role.component.html',
})
export class RoleComponent implements OnInit {

  @Input() userId = 0;
  @Output() childEvent = new EventEmitter<any>();
  roleId: number;
  displayDataList : ItemData[] = [];
  allDataList: ItemData[] = [];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  selectedOptions = [];

  constructor(private http: _HttpClient, private userService: UserService, private roleService: RoleService) {
    this.roleService.getList('','').subscribe((response: any) => {
        this.allDataList = response.list
      });
  }

  currentPageDataChange($event: ItemData[]): void {
    this.allDataList = $event;
  }

  refreshStatus($event: any): void {
    Object.keys(this.mapOfCheckedId).forEach(item => {
      if ($event !== +item) {
        this.mapOfCheckedId[item] = false;
      }
    });
  }

  checkAll(value: boolean): void {
    this.displayDataList.forEach(item => (this.mapOfCheckedId[item.id] = value));
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

  transferId(id: number) {
    if (id > 1) {
      return "66666";
    }
  }
}
