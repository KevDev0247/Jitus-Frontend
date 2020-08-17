import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BaseComponent} from '../../../common/component/base.component';
import {Organization} from '../../../common/model/organization';
import {OrganizationService} from '../../../common/service/organization.service';

/**
 * The component class that define and control the views of the Organization component
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/13
 */
@Component({
  selector: 'app-organization-list',
  templateUrl: "org-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgListComponent extends BaseComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
  }

  organization: Organization = new Organization();
  data: any[] = [];
  selectedRows: STData[] = [];
  nodes = [];
  orgFoundDate?: Date;
  orgDissolveDate?: Date;

  loading = false;
  expandForm = false;
  totalCallNo = 0;
  total = 0;

  @ViewChild('st', { static: true}) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox'},
    { title: 'Number', index: 'orgNo' },
    { title: 'Name', index: 'orgName' },
    { title: 'Abbreviation', index: 'orgAbr' },
    { title: 'Type', index: 'orgType' },
    { title: 'Status', index: 'orgStatus' },
    { title: 'Parent Number', index: 'orgParentNo' },
    { title: 'Order', index: 'sort' },
    { title: 'Remark', index: 'remark' },
    { title: 'Found Date', index: 'orgFoundDate' },
    { title: 'Dissolve Date', index: 'orgDissolveDate' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/sys/org/detail'], { queryParams: { id: item.id } })
          },
        },
        {
          text: 'Delete',
          click: (item: any) => {
            console.log(">>>>>parent no", item.orgParentNo);
            let content = ''
            if (item.orgParentNo === '0') {
              content = 'Delete All child nodes';
            }
            this.showDeleteConfirm(item.id, content);
          },
        },
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    public modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private organizationService: OrganizationService,
    private router: Router
  ) {
    super(modalService)
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.organizationService.getQueryList(this.query.param1, this.query.param2)
      .subscribe((response: any) => {
        this.data = response.data;
        this.changeDetectorRef.detectChanges();
      });
    this.organizationService.getList()
      .subscribe((response: any) => {
        this.nodes = response.data;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0)
        this.changeDetectorRef.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  add(templateRef: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: templateRef,
      nzOnOk: () => {
        this.loading = true;
        this.organization.orgFoundDate = this.transformDateTimeStr(this.orgFoundDate);
        this.organization.orgDissolveDate = this.transformDateTimeStr(this.orgDissolveDate);
        this.organizationService.create(this.organization)
          .subscribe(() => this.getData())
      }
    });
  }

  create() {
    this.router.navigate(['/sys/org/list']);
  }

  remove(id?: number) {
    this.organizationService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.getData();
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes()
      + ':' +
      d.getSeconds();
  }
}
