import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {STColumn, STComponent} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {Contract} from '../../model/contract';
import {ClientService} from '../../service/client.service';
import {ContractService} from '../../service/contract.service';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectListComponent implements OnInit {

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

  contract: Contract = new Contract;
  data_contract: any[] = [];
  data_client: any[] = [];

  loading = false;
  expandForm = false;

  @ViewChild('st', { static: true }) st: STComponent;
  @Output() childEvent = new EventEmitter;
  @Input() type = 0;
  @Input() category: string;

  contractType = [
    {
      id: 0,
      text: 'Dealer Agreement',
      value: false,
      type: 'info',
      checked: false
    },
    {
      id: 1,
      text: 'Cooperation Agreement',
      value: false,
      type: 'info',
      checked: false,
    },
  ];

  columns_contract: STColumn[] = [
    { title: '', index: 'key', type: 'radio'},
    { title: 'Name', index: 'name'},
    { title: 'Client', index: 'clientId'},
    { title: 'Content', index: 'content'},
    {
      title: 'Type',
      index: 'contractType',
      render: 'contractType',
      filter: {
        menus: this.contractType,
        fn: (filter: any, record: any) => record.contractType === filter.id,
      }
    },
    { title: 'Price', index: 'price'},
    {
      title: 'Operations',
      buttons: [
        {
          text: 'OK',
          click: (item: any) => {
            const data = { type: 1, item };
            this.childEvent.emit(data);
          },
        },
      ],
    },
  ];

  columns_client: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Name', index: 'name' },
    { title: 'Phone', index: 'phone' },
    { title: 'Area', index: 'area' },
    { title: 'Address', index: 'address' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'OK',
          click: (item: any) => {
            const data = { type: 2, item };
            this.childEvent.emit(data);
          },
        },
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private contractService: ContractService,
    private clientService: ClientService
  ) {
    console.log('>>>res>>>', this.type);
  }

  ngOnInit() {
    if (this.category === 'project') {
      this.getContractList();
      this.getClientList();
    }
  }

  getData() {
    this.loading = true;
    if (this.type === 1) {
      this.getContractList();
    }
    if (this.type === 2) {
      this.getClientList();
    }
  }

  getContractList() {
    this.contractService.getQueryList(this.q.param1, this.q.param2, this.q.param3)
      .subscribe((res: any) => {
        this.data_contract = res.list;
        this.data_contract.map(i => {
          const statusItem = this.contractType[+i.status];
          if (statusItem) {
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          }
        });
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  getClientList() {
    this.clientService.getQueryList(this.q.param1, this.q.param2)
      .subscribe((res: any) => {
        this.data_client = res.data;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  reset() {
    // wait form reset updated finished
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.getData();
  }
}
