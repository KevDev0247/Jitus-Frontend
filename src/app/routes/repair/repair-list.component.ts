import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {NzTabPosition} from 'ng-zorro-antd/ng-zorro-antd.module';
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
    param4: '',
  };

  repair: Repair = new Repair();
  selectedRows: STData[] = [];
  data: any[] = [];
  form: FormGroup;

  expandForm = false;
  loading = false;
  progressIsVisible = false;
  detailIsVisible = false;
  isOkLoading = false;
  isVisible = false;
  repairId = 0;
  totalCallNo = 0;
  status = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'ID', index: 'code' },
    { title: 'Name', index: 'name' },
    { title: 'Project', index: 'projectName' },
    { title: 'Contact', index: 'contactName' },
    { title: 'Phone', index: 'telno' },
    { title: 'Product', index: 'productName' },
    { title: 'Staff', index: 'staffId' },
    {
      title: 'Operations',
      buttons: [
        {
          icon: 'Edit',
          click: (item: any) => {
            // this.router.navigate(['/repair/detail'], { queryParams: { id: item.id } });
            this.repairId = item.id;
            this.repair = item;
            this.showModal(1);
          },
        },
        {
          text: 'Progress',
          click: (item: any) => {
            // this.router.navigate(['/repair/progress'], { queryParams: { status: item.status } });
            this.status = item.status;
            this.showModal(0);
          },
        },
        {
          text: 'Dispatch',
          iif: item => item.status === 2,
          iifBehavior: 'disabled',
          click: (item: any) => {
            this.router.navigate(['/repair/record/detail'], { queryParams: { id: item.id, status: item.status } });
          },
        },
        {
          text: 'More',
          children: [
            {
              text: 'Comment',
              iif: item => item.status === 6,
              iifBehavior: 'disabled',
              click: (item: any) => {
                this.router.navigate(['/repair/evaluate'], {queryParams: { id: item.id } });
              },
            },
            {
              text: 'Review',
              iif: item => item.status === 6,
              iifBehavior: 'disabled',
            },
            {
              icon: 'Delete',
              click: (item: any) => {
                this.showDeleteConfirm(item.id);
              },
            },
          ],
        },
      ],
    },
  ];

  tabs: Array<{ name: number, num: number }> = [
    { name: 1, num: 5 },
    { name: 2, num: 6 },
    { name: 3, num: 7 },
    { name: 4, num: 8 },
    { name: 5, num: 9 },
    { name: 6, num: 10 },
    { name: 7, num: 11 },
  ];
  nzTabPosition: NzTabPosition = 'left';
  selectedIndex = 0;

  log(args: any[]): void {
    console.log(args[1].name);
    this.q.param4 = args[1].name;
    this.getData();
  }

  constructor(
    public messageService: NzMessageService,
    public modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private repairService: RepairService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    super(modalService);
  }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      repairUnit: [null, []],
      fixDate: [null, []],
      projectId: [null, []],
      contactId: [null, []],
      name: [null, []],
      address: [null, []],
      telno: [null, []],
      installId: [null, []],
      status: [null, []],
      staffId: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  getData() {
    this.loading = true;
    this.repairService
      .getQueryList(this.q.param1, this.q.param2, this.q.param3, this.q.param4)
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
    // this.isVisible = true;
    // this.router.navigate(['/repair/detail']);
    this.repair = new Repair();
    this.showModal(1);
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

  showModal(status: number): void {
    if (status === 0) {
      this.progressIsVisible = true;
    }
    if (status === 1) {
      this.detailIsVisible = true;
    }
  }

  handleOk(): void {
    if (this.repairId) {
      this.repairService.update(this.repair).subscribe(res => {
        if (res.data) {
          this.isVisible = false;
          this.getData();
          this.messageService.success("Edit Successful");
        } else {
          this.messageService.error('Edit Failed');
        }
      });
    } else {
      this.repairService.create(this.repair).subscribe(res => {
        if (res.data) {
          this.isVisible = false;
          this.getData();
          this.messageService.success("Creation Successful");
        } else {
          this.messageService.error('Creation Failed');
        }
      });
    }
  }

  handleCancel(): void {
    this.progressIsVisible = false;
    this.detailIsVisible = false;
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
