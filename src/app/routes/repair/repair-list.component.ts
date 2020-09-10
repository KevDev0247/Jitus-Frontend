import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { BaseComponent } from '../../common/component/base.component';
import { Repair } from '../../common/model/repair';
import { RepairService } from '../../common/service/repair.service';

@Component({
  selector: 'app-repair-list',
  templateUrl: './repair-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairListComponent extends BaseComponent implements OnInit {

  q: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
    param3: '',
  };

  repair: Repair = new Repair();
  selectedRows: STData[] = [];
  data: any[] = [];
  expandForm = false;
  loading = false;
  totalCallNo = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Agency', index: 'repairUnit' },
    { title: 'Repair Date', index: 'fixDate' },
    { title: 'Project', index: 'projectId' },
    { title: 'Contact', index: 'contactId' },
    { title: 'Name', index: 'name' },
    { title: 'Address', index: 'address' },
    { title: 'Phone', index: 'telno' },
    { title: 'Product', index: 'installId' },
    { title: 'Status', index: 'status' },
    { title: 'Staff', index: 'staffId' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/repair/detail'], { queryParams: { id: item.id } })
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
    public modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private repairService: RepairService,
    private router: Router,
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.repairService.getQueryList(this.q.param1, this.q.param2)
      .subscribe((res: any) => {
        this.data = res.list;
        this.loading = false
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  create() {
    this.router.navigate(['/repair/detail'])
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.repairService.create(this.repair)
          .subscribe(() => this.getData());
      },
    });
  }

  remove(id: number) {
    this.repairService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  reset() {
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.getData()
  }
}
