import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { Log } from 'src/app/common/model/log';
import { LogService } from 'src/app/common/service/log.service';
import {CommonUtils} from '../../../common/util/common.utils';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogListComponent implements OnInit {

  q: any = {
    pi: 0,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
    param1: '',
    param2: '',
  };

  sysLog: Log = new Log();
  comUtils: CommonUtils = new CommonUtils();
  data: any[] = [];
  selectedRows: STData[] = [];

  fromTime: Date;
  toTime: Date;
  expandForm = false;
  loading = false;
  totalCallNo = 0;
  total = 0;

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'User Name', index: 'userName' },
    { title: 'Operations', index: 'operation' },
    { title: 'Method', index: 'method' },
    { title: 'Parameters', index: 'params' },
    { title: 'IP Address', index: 'ip' },
    { title: 'Create Time', index: 'createTime' },
  ];

  constructor(
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private sysLogService: LogService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.q.param1 = this.comUtils.ConvertDateTimeStr(this.fromTime);
    this.q.param2 = this.comUtils.ConvertDateTimeStr(this.toTime);
    console.log('>>>>param1>>>>', this.q.param1);
    this.sysLogService.getQueryList(this.q.param1, this.q.param2)
      .subscribe((res: any) => {
        this.data = res.list;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  reset() {
    // wait form reset updated finished
    this.q.param1 = '';
    this.q.param2 = '';
    this.fromTime = null;
    this.toTime = null;
    this.getData();
  }
}
