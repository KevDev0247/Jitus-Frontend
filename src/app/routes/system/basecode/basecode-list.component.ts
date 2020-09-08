import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {STChange, STColumn, STComponent, STData} from '@delon/abc';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Basecode} from '../../../common/model/basecode';
import {BasecodeService} from '../../../common/service/basecode.service';

/**
 * The component class that define and control the views of the Basecode component
 * Basecode or Basic Data is a term we invented to describe the static data
 * that doesn't change in comparison to business data which is more dynamic such as regions, dimensions
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/08/18
 */
@Component({
  selector: 'app-basecode-list',
  templateUrl: './basecode-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasecodeListComponent implements OnInit {

  query: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
  };

  basecode: Basecode = new Basecode();
  data: any[] = [];
  selectedRow: STData[] = [];

  loading = false;
  expandForm = false;
  totalCallNo = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox'},
    { title: 'Type ID', index: 'typeId'},
    { title: 'Type Name', index: 'typename'},
    { title: 'Field ID', index: 'basecode'},
    { title: 'Field Name', index: 'basecodename'},
    {
      title: 'Operations',
      buttons: [
        {
          text: 'View',
          click: (item: any) => {
            this.router.navigate(['/sys/basecode/detail'], { queryParams: { id: item.id } })
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
    private basecodeService: BasecodeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.basecodeService.getQueryList(this.query.param1, this.query.param2)
      .subscribe((response: any) => {
        this.data = response.list;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  stChange(event: STChange) {
    switch (event.type) {
      case 'checkbox':
        this.selectedRow = event.checkbox;
        this.totalCallNo = this.selectedRow.reduce((total, cv) => total + cv.callNo, 0);
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  add(tpl: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: '',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.basecodeService.create(this.basecode)
          .subscribe(() => this.getData());
      },
    });
  }

  create() {
    this.router.navigate(['/sys/basecode/detail']);
  }

  reset() {
    this.query.param1 = '';
    this.query.param2 = '';
    this.getData();
  }

  remove(id: number) {
    this.basecodeService.delete(id).subscribe(() => {
      this.getData();
      this.st.clearCheck();
    })
  }

  showDeleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete?',
      nzContent: '<b style="color: : red;">This action is irreversible</b>',
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
