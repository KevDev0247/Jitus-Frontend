import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Staff} from '../../common/model/staff';
import {StaffService} from '../../common/service/staff.service';

/**
 * The component class that define and control the views of the StaffDetail Component
 *
 * @Author Yonggang Su
 * Created on 2020/08/11
 */
@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html'
})
export class StaffDetailComponent implements OnInit {

  formGroup: FormGroup;
  staff: Staff = new Staff();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private staffService: StaffService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.staffService.getDetails(this.id).subscribe((res: any) => {
        this.staff = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      sCode: [null, []],
      name: [null, []],
      dept: [null, []],
      company: [null, []],
      email: [null, []],
      telno: [null, []],
      address: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.staffService.update(this.staff).subscribe(res =>{
      if (res.data) {
        this.router.navigate(['/staff/list']);
      }
    })
  }

  save() {
    this.staffService.create(this.staff).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/staff/list'])
      }
    })
  }

  goBack() {
    window.history.back();
  }
}
