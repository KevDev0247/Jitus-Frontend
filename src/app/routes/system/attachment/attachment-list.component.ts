import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Attachments} from '../../../common/model/attachments';
import {AttachmentsService} from '../../../common/service/attachments.service';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentListComponent implements OnInit {

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

  attachments: Attachments = new Attachments();
  data: any[] = [];
  selectedRows: STData[] = [];

  loading = false;
  expandForm = false;
  totalCallNo = false;
  total = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: '', type: 'checkbox'},
    { title: 'File ID', index: 'fileid'},
    // { title: 'Shares', index: 'shareCount'},
    { title: 'Downloads', index: 'downloadCount'},
    { title: 'Users', index: 'userId'},
    { title: 'Extension', index: 'extensions'},
    { title: 'Create', index: 'createdtime'},
    {
      title: 'Operations',
      buttons: [
        {
          text: 'Download',
          click: (item: any) => {
            this.router.navigate(['/sys/attachment/detail'], { queryParams: { id: item.fileid } });
          },
        },
        {
          text: 'Delete',
          click: (item: any) => {
            this.showDeleteConfirm(item.fileid);
          },
        },
      ],
    },
  ];

  constructor(
    public messageService: NzMessageService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private attachmentService: AttachmentsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.attachmentService.getQueryList(this.q.param1, this.q.param2, this.q.param3)
      .subscribe((response: any) => {
        this.data = response.list;
        this.loading = true;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRows = event.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
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
        this.attachmentService.create(this.attachments)
          .subscribe(() => this.getData());
      },
    });
  }

  create() {
    this.router.navigate(['/sys/attachment/detail']);
  }

  remove(id: number) {
    this.attachmentService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    })
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
    });
  }

  reset() {
    // wait form reset updated finished
    this.q.param1 = '';
    this.q.param2 = '';
    this.q.param3 = '';
    this.getData();
  }

  download(url, id?: number) {
    window.open(url);
    this.attachmentService.addDownloadCount(id)
      .subscribe(response => {
        if (response.data) {
          this.getData();
        }
      });
  }
}
