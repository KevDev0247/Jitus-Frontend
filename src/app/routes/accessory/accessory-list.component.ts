import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Accessory} from '../../common/model/accessory';
import {AccessoryService} from '../../common/service/accessory.service';

@Component({
  selector: 'app-accessory-list',
  templateUrl: './accessory-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessoryListComponent implements OnInit {

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

  accessory: Accessory = new Accessory();
  data: any[] = [];
  selectedRows: STData[] = [];
  loading = false;
  expandForm = false;
  totalCallNo = 0;


  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Type', index: 'type' },
    { title: 'Name', index: 'name' },
    { title: 'Code', index: 'code' },
    { title: 'Spec', index: 'spec' },
    { title: 'Model', index: 'model' },
    { title: 'Unit', index: 'unit' },
    { title: 'Count', index: 'count' },
    { title: 'Safe Count', index: 'safeCount' },
    { title: 'Status', index: 'status' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'Details',
          click: (item: any) => {
            this.router.navigate(['/accessory/detail'], { queryParams: { id: item.id } });
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
    private accessoryService: AccessoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getData() {
    this.loading = false;
    this.accessoryService.getQueryList(this.q.param1, this.q.param2, +this.q.param3)
      .subscribe((res: any) => {
        this.data = res.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  create() {
    this.router.navigate(['/accessory/detail']);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.accessoryService.create(this.accessory)
          .subscribe(() => this.getData());
      },
    });
  }

  reset() {
    // wait form reset updated finished
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.getData();
  }

  remove(id: number) {
    this.accessoryService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red;">This operation is irreversible</b>',
      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
