import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Project } from '../../common/model/project';
import { ProjectService } from '../../common/service/project.service';

/**
 * The service class for ProjectList module
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/10
 */
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
  }

  data: any[] = [];
  project: Project = new Project();
  selectedRows: STData[] = [];

  loading = false;
  expandForm = false;
  totalCallNo = 0;
  total = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Name', index: 'name' },
    { title: 'Contract', index: 'contractId' },
    { title: 'Description', index: 'description' },
    { title: 'Address', index: 'address' },
    { title: 'Client', index: 'client' },
    { title: 'Contract Start Time', index: 'contractStartTime' },
    { title: 'Contract End Time', index: 'contractEndTime' },
    { title: 'Delivery Time', index: 'deliveryTime' },
    { title: 'Accept Time', index: 'acceptTime' },
    { title: 'Guarantee Type', index: 'guaranteeType' },
    { title: 'Guarantee Month', index: 'guaranteeMonth' },
    { title: 'Guarantee Due Time', index: 'guaranteeDueTime' },
    { title: 'Staff', index: 'staffId' },
    { title: 'File', index: 'fileId' },
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/project/detail'], { queryParams: { id: item.id } });
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
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.projectService.getQueryList(this.query.param1, this.query.param2)
      .subscribe((response: any) => {
        this.data = response.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
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

  create() {
    this.router.navigate(['/project/detail']);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.projectService.create(this.project)
          .subscribe(() => this.getData());
      }
    })
  }

  remove(id: number) {
    this.projectService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    });
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

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.getData();
  }
}
