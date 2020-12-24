import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {STColumn, STComponent} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {Contract} from '../../model/contract';
import {ClientService} from '../../service/client.service';
import {ContractService} from '../../service/contract.service';
import {ProductService} from '../../service/product.service';
import {ProjectService} from '../../service/project.service';

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
  data_project: any[] = [];
  data_product: any[] = [];

  loading = false;
  expandForm = false;
  kind: string;

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

  columns_project: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Name', index: 'name' },
    { title: 'Delivery Time', index: 'deliveryTime' },
    { title: 'Accept Time', index: 'acceptTime' },
    { title: 'Guarantee Type', index: 'guaranteeType' },
    { title: 'Guarantee Month', index: 'guaranteeMonth' },
    { title: 'Guarantee Due Time', index: 'guaranteeDueTime' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'OK',
          click: (item: any) => {
            const data = { type: 3, item };
            this.childEvent.emit(data);
          },
        },
      ],
    },
  ];

  columns_product: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Name', index: 'title' },
    { title: 'Serial Number', index: 'serialNo' },
    { title: 'Specs', index: 'spec' },
    { title: 'Type', index: 'type' },
    { title: 'Brand', index: 'brand' },
    { title: 'Manufacturing Time', index: 'produceTime' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'OK',
          click: (item: any) => {
            const data = { type: 4, item };
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
    private clientService: ClientService,
    private projectService: ProjectService,
    private productService: ProductService,
  ) {
    console.log('>>>res>>>', this.type);
  }

  ngOnInit() {
    if (this.category === 'project') {
      this.getContractList();
      this.getClientList();
    }
    if (this.kind === 'repair') {
      this.getProjectList();
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

  getProjectList() {
    this.projectService.getQueryList(this.q.param1, this.q.param2).subscribe((res: any) => {
      this.data_project = res.list;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  getProductList() {
    this.productService.getQueryList(this.q.param1, this.q.param2, this.q.param3).subscribe((res: any) => {
      this.data_product = res.list;
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
