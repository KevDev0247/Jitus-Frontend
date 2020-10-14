import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Staff} from '../../common/model/staff';
import {StaffService} from '../../common/service/staff.service';

/**
 * The service class for StaffList module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/11
 */
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 0,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
    param3: '',
  };

  data: any[] = [];
  loading = false;
  staff: Staff = new Staff();

  selectedRows: STData[] = [];
  totalCallNo = 0;
  expandForm = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Work Order', index: 'scode' },
    { title: 'Name', index: 'name' },
    { title: 'Department', index: 'dept' },
    { title: 'Company', index: 'company' },
    { title: 'Email', index: 'email' },
    { title: 'Phone', index: 'telno' },
    { title: 'Address', index: 'address' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/staff/detail'],
              { queryParams: { id: item.id } });
          },
        },
        {
          text: 'Delete',
          click: (item: any) => {
            this.showDeleteConfirm(item.id);
          },
        },
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private staffService: StaffService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.staffService.getQueryList(this.query.param1, this.query.param2)
      .subscribe((response: any) => {
        this.data = response.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  create() {
    this.router.navigate(['/staff/detail']);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.staffService.create(this.staff)
          .subscribe(() => this.getData());
      },
    });
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.getData();
  }

  remove(id: number) {
    this.staffService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    })
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox;
        this.totalCallNo = this.selectedRows
          .reduce((total, cv) => total + cv.callNo, 0);
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Sure',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
