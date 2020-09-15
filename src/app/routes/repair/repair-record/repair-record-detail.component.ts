import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {RepairRecord} from '../../../common/model/repair-record';
import {RepairRecordService} from '../../../common/service/repair-record.service';

@Component({
  selector: 'app-repair-record-detail',
  templateUrl: './repair-record-detail.component.html',
})
export class RepairRecordDetailComponent implements OnInit {

  form: FormGroup;
  repairRecord: RepairRecord = new RepairRecord();
  id: any;
  status: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private repairRecordService: RepairRecordService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.repairRecord.repairId = params.id;
      this.status = params.status;
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      repairId: [null, []],
      description: [null, []],
      dcode: [null, []],
      content: [null, []],
      ccode: [null, []],
      repairmanId: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  save() {
    this.repairRecordService.create(this.repairRecord).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/repair']);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
