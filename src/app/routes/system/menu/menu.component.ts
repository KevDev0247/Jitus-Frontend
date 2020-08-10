import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MenuService} from '../../../common/service/menu.service';
import {RoleService} from '../../../common/service/role.service';
import {UserService} from '../../../common/service/user.service';

/**
 * The component class that define and control the views of the menu.
 *
 * @Author Yonggang Su
 * Created on 2020/08/07
 */
interface ItemData{
  id: number;
  parentId: number;
  level: number;
  text: string;
  i18n: string;
  link: string;
  createTime: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {

  @Input() roleId = 0;
  @Output() childEvent = new EventEmitter<any>();
  menuId: number;

  isAllDisplayDataChecked = false;
  isIndeterminate = false;

  displayDataList: ItemData[] = [];
  allDataList: ItemData[] = [];
  selectOptions = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  q: any = {
    parentId: '',
    text: ''
  }

  constructor(private userService: UserService, private msgSrc: NzMessageService,
    private menuService: MenuService, private roleService: RoleService) {
    this.menuService.getQueryList(this.q.parentId, this.q.text)
      .subscribe((res: any) => {
        this.allDataList = res.list;
      })
  }

  currentPageDataChange($event: ItemData[]): void {
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
    this.displayDataList.forEach(item => (this.mapOfCheckedId[item.id] = value));
  }

  ngOnInit(): void {}

  handleData() {
    Object.keys(this.mapOfCheckedId).forEach(item => {
      if (this.mapOfCheckedId[item]) {
        this.menuId = +item
      }
    })
    this.roleService.addMenu(this.roleId, this.menuId).subscribe(res => {
      if (res.data) {
        this.msgSrc.success(res.message)
        this.childEvent.emit(1)
      } else {
        this.msgSrc.error(res.msg)
      }
    })
  }

  transferLevel(id: number) {
    if (id === 1) {
      return 'First Level Menu';
    }
    if (id === 2) {
      return 'Second Level Menu';
    }
    if (id === 3) {
      return 'Third Level Menu';
    }
  }
}
