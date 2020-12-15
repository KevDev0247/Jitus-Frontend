import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Product} from 'src/app/common/model/Product';
import {ProductService} from 'src/app/common/service/product.service';

/**
 * The service class for ProjectList module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/12/06
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {

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

  data: any[] = [];
  selectedRows: STData[] = [];
  product: Product = new Product();

  loading = false;
  expandForm = false;
  totalCallNo = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Title', index: 'title' },
    { title: 'Specs', index: 'Specs' },
    { title: 'Serial Number', index: 'serialNo' },
    { title: 'Type', index: 'type' },
    { title: 'Brand', index: 'brand' },
    { title: 'Manufacturing Date', index: 'produceTime' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'Details',
          click: (item: any) => {
            this.router.navigate(['/product/detail'], { queryParams: { id: item.id } });
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
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.productService.getQueryList(this.q.param1, this.q.param2, this.q.param3).subscribe((res: any) => {
      this.data = res.list;
      this.loading = false;
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

  remove(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }
  create() {
    this.router.navigate(['/product/detail']);
  }
  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.productService.create(this.product).subscribe(() => this.getData());
      },
    });
  }

  reset() {
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.getData();
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: red">This operation is irreversible</b>',
      nzOkText: 'OK',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK');
        this.remove(id);
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => console.log('Cancel'),
    })
  }
}
