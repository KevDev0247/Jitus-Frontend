import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Repair} from 'src/app/common/model/repair';
import {RepairService} from 'src/app/common/service/repair.service';
import {CommonUtils} from '../../common/util/common.utils';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
})
export class RepairDetailComponent implements OnInit {

  form: FormGroup;
  fixDate: Date;
  repair: Repair = new Repair();
  commonUtils: CommonUtils = new CommonUtils();
  @Input() repairId: number;
  @Output() childEvent = new EventEmitter<any>();

  id: any;
  current = 2;
  isVisible = false;
  kind = 'repair';
  type: number;
  title: string;
  projectName: string;
  productName: string;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private repairService: RepairService) {
    /*this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.repairService.getDetails(this.repairId).subscribe((res: any) => {
        this.repair = res.data;
      });
    }*/
  }

  ngOnInit(): void {
    console.log('>>>repairId 2>>>', this.repairId);
    if (this.repairId) {
      this.repairService.getDetails(this.repairId).subscribe((res: any) => {
        this.repair = res.data;
        this.cdr.detectChanges();
      })
    }
    this.form = this.fb.group({
      repairUnit:  [null, []],
      fixDate:  [null, []],
      projectId:  [null, []],
      contactId:  [null, []],
      name:  [null, []],
      code: [null, []],
      address:  [null, []],
      telno:  [null, []],
      installId:  [null, []],
      status:  [null, []],
      staffId:  [null, []],
      createTime:  [null, []],
      updateTime:  [null, []],
    });
  }

  create() {
    this.repair.fixDate = this.commonUtils.transFormDateTimeStr(this.fixDate);
    this.repairService.create(this.repair).subscribe(res => {
      if (res.data) {
        this.msg.success("creation successful");
        this.childEvent.emit(2);
      } else {
        this.msg.error("creation failed")
      }
    });
  }

  open(type?: number) {
    this.type = type;
    if (type === 3) {
      this.title = 'project';
    }
    if (type === 4) {
      this.title = 'product';
    }
    this.isVisible = true;
  }

  update() {
    this.repairService.update(this.repair).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/repair/list']);
      }
    })
  }

  approve() {
    this.repairService.approve(this.repair.id).subscribe(res => {
      if (res.data) {
        this.msg.success("Approval successful");
      } else {
        this.msg.success("Approval failed");
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getChildEvent(index: any) {
    if (index.type === 3) {
      this.projectName = index.item.name;
      this.repair.projectId = index.item.id;
    }
    if (index.type === 4) {
      this.productName = index.item.title;
      this.repair.installId = index.item.id;
    }
    this.isVisible = false;
  }

  goBack() {
    window.history.back();
  }
}
