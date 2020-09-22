import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Repair} from '../../../common/model/repair';
import {RepairService} from '../../../common/service/repair.service';
import {CommonUtils} from '../../../common/util/common.utils';

@Component({
  selector: 'app-repair-progress',
  templateUrl: './progress.component.html',
})
export class ProgressComponent implements OnInit {

  form: FormGroup;
  repair: Repair = new Repair();
  commonUtils: CommonUtils = new CommonUtils();
  fixDate: Date;

  id: any;
  current = 2;
  @Input() index = 0;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: NzMessageService,
    private changeDetectorRef: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private repairService: RepairService,
  ) {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.index = params.status;
    // });
    if (this.id) {
      this.repairService.getDetails(this.id).subscribe((res: any) => {
        this.repair = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      repairUnit: [null, []],
      fixDate: [null, []],
      projectId: [null, []],
      contactId: [null, []],
      name: [null, []],
      address: [null, []],
      telno: [null, []],
      installId: [null, []],
      status: [null, []],
      staffId: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }
}
