import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Contract} from '../../../common/model/contract';
import {ContractService} from '../../../common/service/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    statusList: [],
    param1: '',
    param2: '',
    param3: '',
  };

  data: any[] = [];
  selectedRows: STData[] = [];
  contract: Contract = new Contract();
  totalCallNo = 0;
  total = 200;
  pageSize = 10;
  loading = false;
  expandForm = false;

  @ViewChild('st', { static: true }) st: STComponent;
  statusList = [
    {
      id: 0,
      type: 'info',
    },
    {
      id: 1,
      type: 'info',
    }
  ];

  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Location', index: 'signPlace' },
    { title: 'Start', index: 'startDate' },
    { title: 'End', index: 'endDate' },
    { title: 'Project', index: 'projectId' },
    { title: 'Client', index: 'clientId' },
    { title: 'Content', index: 'content' },
    { title: 'Model', index: 'pattern' },
    { title: 'Name', index: 'name' },
    { title: 'Address', index: 'address' },
    { title: 'Phone', index: 'telno' },
    { title: 'Sign Date', index: 'signDate' },
    { title: 'Signatory', index: 'signmanId' },
    { title: 'Price', index: 'price' },
    {
      title: 'Type',
      index: 'status',
      render: 'statusList',
      filter: {
        menus: this.statusList,
        fn: (filter: any, record: any) => record.status === filter.id,
      },
    },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/repair/contract/detail'], { queryParams: { id: item.id } });
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
    private router: Router,
    private contractService: ContractService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changePage(event: any) {
    console.log('>>>number>>>', event);
  }

  getData() {
    this.loading = true;
    this.contractService.getQueryList(this.query.param1, this.query.param2, this.query.param3)
      .subscribe((res: any) => {
        this.data = res.list;
        this.data.map(i => {
          const statusItem = this.statusList[+i.status];
          if (statusItem) {
            i.statusType = statusItem.type;
            return i;
          }
        });
        console.log('>>>res8888', this.data);
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  create() {
    this.router.navigate(['/repair/contract/detail']);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.contractService.create(this.contract)
          .subscribe(() => this.getData());
      },
    });
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.query.param3 = '';
    this.getData();
  }

  remove(id: number) {
    this.contractService.delete(id)
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
      });
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
      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: ()  => console.log('Cancel'),
    });
  }

  goBack() {
    window.history.back();
  }
}
