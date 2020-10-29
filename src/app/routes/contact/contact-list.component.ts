import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc/public_api';
import {NzMessageService, NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {Contact} from '../../common/model/contact';
import {ContactService} from '../../common/service/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
    param3: '',
  };

  contact: Contact = new Contact();
  data: any[] = [];
  selectedRows: STData[] = [];

  expandForm = false;
  loading = false;
  totalCallNo = 0;
  total = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox'},
    { title: 'Client', index: 'name'},
    { title: 'Department', index: 'dept'},
    { title: 'Position', index: 'profession'},
    { title: 'Phone', index: 'telno'},
    { title: 'Email', index: 'email'},
    { title: 'QQ', index: 'qq'},
    { title: 'WeChat', index: 'wechat'},
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/contact/detail'], { queryParams: { id: item.id} });
          }
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
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.contactService.getQueryList(this.query.param1, this.query.param2, this.query.param3)
      .subscribe((response: any) => {
        this.data = response.list;
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
    this.router.navigate(['/contact/detail']);
  }

  add(templateRef: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: templateRef,
      nzOnOk: () => {
        this.loading = true;
        this.contactService.create(this.contact)
          .subscribe(() => this.getData());
      },
    });
  }

  remove(id: number) {
    this.contactService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    })
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.query.param3 = '';
    this.getData();
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
