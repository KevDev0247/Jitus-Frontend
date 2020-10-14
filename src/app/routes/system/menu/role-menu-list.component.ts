import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData, XlsxService} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BaseComponent} from '../../../common/component/base.component';
import {Menu} from '../../../common/model/menu';
import {MenuService} from '../../../common/service/menu.service';
import {RoleService} from '../../../common/service/role.service';

/**
 * The component class that define and control the views of the role-menu list.
 *
 * @Author Yonggang Su
 * Created on 2020/08/08
 */
@Component({
  selector: 'app-role-menu-list',
  templateUrl: './role-menu-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleMenuListComponent extends BaseComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 0,
    sorter: '',
    status: null,
    statusList: [],
    parentId: '',
    text: '',
  };

  data: any[] = [];
  data_xslx: any;
  menuList: any[] = [];
  firstMenus = [];
  selectedRows: STData[] = [];
  menu: Menu = new Menu();

  totalCallNumber = 0;
  loading = false;
  expandForm = false;
  isVisible = false;
  parentId: number;
  @Input() roleId = 0;
  @Output() childEvent = new EventEmitter<any>();

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
          text: 'Delete',
          click: (item: any) => {
            this.showDeleteConfirm(item.id)
          },
        },
      ],
    },
  ];

  constructor(public msgSrc: NzMessageService, public modalSrc: NzModalService,
              private cdr: ChangeDetectorRef, private xlsx: XlsxService,
              private menuService: MenuService, private roleService: RoleService, private router: Router) {
    super(modalSrc);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.menuService.getRoleMenuList(this.roleId)
      .subscribe((response: any) => {
        this.data = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox!;
        this.totalCallNumber = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  remove(id: number) {
    this.roleService.deleteMenu(this.roleId, id).subscribe(res => {
      if (res.data) {
        this.msgSrc.success(res.message);
        this.getData();
        this.cdr.detectChanges();
        this.st.clearCheck();
        this.childEvent.emit(2);
      } else {
        this.msgSrc.error(res.message);
      }
    });
  }

  create() {
    this.router.navigate(['/sys/menu/detail']);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrc.create({
      nzTitle: '',
      nzContent: tpl,
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
              this.msgSrc.success('Menu creation successful');
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
    this.menuService.getFirstMenuList().subscribe(res => {
      this.firstMenus = res.data;
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

  change(e: Event) {
    const file = (e.target as HTMLInputElement).files![0];
    this.xlsx.import(file).then(res => (this.data_xslx = res));
  }

  import() {
    if (!this.data_xslx) {
      this.msgSrc.error('Please select your file first');
      return;
    }

    const preData = this.data_xslx['sheet name'];
    for (let i = 1; i < preData.length; i++) {
      const menu = new Menu();
      menu.parentId = preData[i][0];
      menu.text = preData[i][1];
      menu.i18n = preData[i][2];
      menu.link = preData[i][3];
      menu.icon = preData[i][4];
      this.menuList.push(menu);
    }

    this.menuService.batchCreate(this.menuList)
      .subscribe(response => {
        if (response.data) {
          this.msgSrc.success('Batch creation successful');
          this.getData();
        }
      });
  }
}
