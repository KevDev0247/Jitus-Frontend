import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Evaluate} from '../../../common/model/evaluate';
import {EvaluateService} from '../../../common/service/evaluate.service';

@Component({
  selector: 'app-evaluate-detail',
  templateUrl: './evaluate-detail.component.html',
})
export class EvaluateDetailComponent implements OnInit {

  form: FormGroup;
  evaluate: Evaluate = new Evaluate();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private evaluateService: EvaluateService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.evaluate.repairId = params.id;
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      comments: [null, []],
      rate: [null, []],
      userId: [null, []],
      createTime: [null, []],
    });
  }

  save() {
    this.evaluateService.create(this.evaluate).subscribe(res => {
      if (res.data) {
        this.msg.success('Comment Successful');
        this.router.navigate(['/repair']);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
