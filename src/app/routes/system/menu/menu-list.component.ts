import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData, XlsxService } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { BaseComponent } from '../../../common/component/base.component';
import { Menu } from '../../../common/model/menu';
import { MenuService } from '../../../common/service/menu.service';

/**
 * The component class that define and control the views of the menu list.
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/07
 */
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuListComponent extends BaseComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    parentId: '',
    text: '',
  }

  data: any[] = [];
  data_xslx: any;
  menuList: any[] = [];
  firstMenus = [];
  selectedRows: STData[] = [];
  menu: Menu = new Menu();

  total = 0;
  totalCallNumber = 0;
  loading = false;
  expandForm = false;
  isVisible = false;
  parentId: number;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'ID', index: 'id' },
    { title: 'Parent ID', index: 'parentId' },
    { title: 'Menu Level', index: 'level' },
    { title: 'Menu Name', index: 'text' },
    { title: 'Menu Code', index: 'i18n' },
    { title: 'Link', index: 'link' },
    { title: 'Icon', index: 'icon' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/sys/menu/menu-detail'],
              { queryParams: {id: item.id}});
          }
        },
        {
          text: 'Delete',
          click: (item => {
            this.showDeleteConfirm(item.id)
          })
        }
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    public modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private xlsx: XlsxService,
    private menuService: MenuService,
    private router: Router,
  ) {
    super(modalService);
    this.getData();
  }

  ngOnInit(): void {
    this.getFirstMenuList();
  }

  getData() {
    this.loading = true;
    this.menuService.getQueryList(this.query.parentId, this.query.text)
      .subscribe((response: any) => {
        this.data = response.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox!;
        this.totalCallNumber = this.selectedRows
          .reduce((total, cv) => total + cv.callNo, 0);
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  remove(id: number) {
    this.menuService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  create() {
    this.router.navigate(['/sys/menu/menu-detail']);
  }

  add(templateRef: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: templateRef,
      nzOnOk: () => {
        this.loading = true;
        if (this.parentId) {
          this.menu.parentId = this.parentId;
        } else {
          this.menu.parentId = 0;
        }

        this.menuService.create(this.menu)
          .subscribe(response =>{
            if (response.data) {
              this.getData();
              this.messageService.success('Menu creation successful');
            }
          })
      }
    });
  }

  reset() {
    this.query.name = '';
    this.query.email = '';
    this.getData();
  }

  download() {
    const data = [this.columns.map(i => i.title)];
    this.data.forEach(i => data.push(this.columns.map(c => i[c.index as string])));
    this.xlsx.export({
      sheets: [
        {
          data,
          name: 'sheet name',
        },
      ],
    });
  }

  getFirstMenuList() {
    this.menuService.getFirstMenuList().subscribe(response => {
      this.firstMenus = response.data;
    })
  }

  showModal(): void {
    this.isVisible = true;
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

  change(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.xlsx.import(file).then(response => (this.data_xslx = response));
  }

  import() {
    if (!this.data_xslx) {
      this.messageService.error('Please select your file first');
      return;
    }

    const preparedData = this.data_xslx['sheet name'];
    for (let i = 1; i < preparedData.length; i++) {
      const menu = new Menu();
      menu.parentId = preparedData[i][0];
      menu.text = preparedData[i][1];
      menu.i18n = preparedData[i][2];
      menu.link = preparedData[i][3];
      menu.icon = preparedData[i][4];
      this.menuList.push(menu);
    }

    this.menuService.batchCreate(this.menuList).subscribe(response => {
      if (response.data) {
        this.messageService.success('Batch creation successful');
        this.getData();
      }
    });
  }
}
