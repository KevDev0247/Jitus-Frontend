import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Repair} from 'src/app/common/model/Repair';
import {RepairService} from 'src/app/common/service/repair.service';


@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
})
export class RepairDetailComponent implements OnInit {

  form: FormGroup;
  repair: Repair = new Repair();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activedRoute: ActivatedRoute, private router: Router, private repairService: RepairService) {
    this.activedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.repairService.getDetails(this.id)
        .subscribe((res: any) => {
          this.repair = res.data;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      repairUnit:  [null, []],
      fixDate:  [null, []],
      projectId:  [null, []],
      contactId:  [null, []],
      name:  [null, []],
      address:  [null, []],
      telno:  [null, []],
      installId:  [null, []],
      status:  [null, []],
      staffId:  [null, []],
      createTime:  [null, []],
      updateTime:  [null, []],
    });
  }

  transFormDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.repairService.update(this.repair).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/repair/list']);
      }
    })
  }

  goBack() {
    window.history.back();
  }
}
