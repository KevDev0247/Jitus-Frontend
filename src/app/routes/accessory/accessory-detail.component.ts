import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessory } from 'src/app/common/model/accessory';
import { AccessoryService } from 'src/app/common/service/accessory.service';

@Component({
  selector: 'app-accessory-detail',
  templateUrl: './accessory-detail.component.html',
})
export class AccessoryDetailComponent implements OnInit {

  form: FormGroup;
  accessory: Accessory = new Accessory();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
    private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
    private router: Router, private accessoryService: AccessoryService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.accessoryService.detail(this.id).subscribe((res: any) => {
        this.accessory = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [null, []],
      name: [null, []],
      code: [null, []],
      spec: [null, []],
      model: [null, []],
      unit: [null, []],
      count: [null, []],
      safeCount: [null, []],
      status: [null, []],
      isReturn: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  transFormDateTimeStr(d: Date) {
    const datetimeStr =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds();
    return datetimeStr;
  }

  save() {
    if (this.accessory.id) {
      this.accessoryService.update(this.accessory).subscribe(res => {
        if (res.data) {
          this.msg.success('Update successful');
          this.router.navigate(['/accessory/list']);
        } else {
          this.msg.success('Update failed');
        }
      });
    } else {
      this.accessoryService.create(this.accessory).subscribe(res => {
        if (res.data) {
          this.msg.success('Creation successful');
          this.router.navigate(['/accessory/list']);
        } else {
          this.msg.success('Creation failed');
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
