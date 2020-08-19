import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Basecode} from '../../../common/model/basecode';
import {BasecodeService} from '../../../common/service/basecode.service';

/**
 * The component class that define and control the views of the Basecode component
 * Basecode or Basic Data is a term we invented to describe the static data
 * that doesn't change in comparison to business data which is more dynamic such as regions, dimensions
 *
 * @Author Yonggang Su
 * Created on 2020/08/18
 */
@Component({
  selector: 'app-basecode-detail',
  templateUrl: 'basecode-detail.component.html'
})
export class BasecodeDetailComponent implements OnInit {

  form: FormGroup;
  basecode: Basecode = new Basecode();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private basecodeService: BasecodeService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.basecodeService.getDetail(this.id).subscribe((res: any) => {
        this.basecode = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeid: [null, [Validators.required]],
      typename: [null, [Validators.required]],
      basecode: [null, [Validators.required]],
      basecodename: [null, [Validators.required]],
    });
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.basecodeService.update(this.basecode).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/sys/basecode/list']);
      }
    })
  }

  goBack() {
    window.history.back();
  }
}
