import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MenuService} from '../../../common/service/menu.service';
import {UserService} from '../../../common/service/user.service';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .grid-config {
        height: 120px;
        width: 250px;
        font-size: 14px;
        line-height: 120px;
        border-radius: 4px;
      }
    `,
  ],
})
export class DashboardV1Component implements OnInit {

  menus: any[] = [];
  addedMenus: any[] = [];
  allMenus: any[] = [];
  menuIds: string[];

  notifications: any[] = [];
  eRCount: number = -1;
  tRCount: number = -1;

  isVisible = false;
  title: string;
  type: number;

  customStyle = {
    border: '0px',
    'border-top': '0px solid #d9d9d9',
  };

  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: {
        border: '0px',
      },
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        'border-top': '0px',
      },
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        border: '0px',
      },
    },
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private menuService: MenuService,
    private messageService: NzMessageService,
    private userService: UserService,
  ) {
    this.getMainMenusList(2, 1);
    this.getIndexData();
  }

  ngOnInit(): void { }

  getMainMenusList(userId: number, isShow: number) {
    this.menuService.getMainMenuList(userId, isShow)
      .subscribe(response => {
        this.menus = response.data;
        this.changeDetectorRef.detectChanges();
      });
  }

  getAddMainMenuList(userId: number, isShow: number) {
    this.menuService.getMainMenuList(userId, isShow)
      .subscribe(response => {
        this.addedMenus = response.data;
        this.changeDetectorRef.detectChanges();
      });
  }

  getAllMainMenuList(userId: number, isShow: number) {
    this.menuService.getMainMenuList(userId, isShow)
      .subscribe(response => {
        this.allMenus = response.data;
        this.changeDetectorRef.detectChanges();
      });
  }

  getIndexData() {
    this.userService.getIndex()
      .subscribe(response => {
        this.notifications = response.notifications;
        this.eRCount = response.eRCount;
        this.tRCount = response.tRCount;
        this.changeDetectorRef.detectChanges();
      });
  }

  handleOpen(type: number): void {
    this.type = type;
    if (type === 1) {
      this.title = 'Add Modules';
      this.getAddMainMenuList(2, 0);
    }
    if (type === 2) {
      this.title = 'All Modules';
      this.getAllMainMenuList(2, -1);
    }
    this.isVisible = true;
  }

  handleOk() {
    this.menuService.addMainMenu(this.menuIds)
      .subscribe(response => {
        this.getMainMenusList(2, 1);
        this.isVisible = false;
        this.messageService.success("Module add successful");
      });
  }

  handleCancel() {
    this.isVisible = false;
  }

  log(value: string[]): void {
    this.menuIds = value;
  }
}
