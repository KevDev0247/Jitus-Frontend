import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from '../../../common/model/user';

/**
 * The service class for user module
 *
 * @Author: Yonggang Su
 * Created on 2020/08/02
 */
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  form: FormGroup;
  submitting = false;
  i = null;
  user: User = new User();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              private http: _HttpClient, public activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.user;
    });
    if (this.id) {
      this.http.get('http://localhost:8080/user/detail', {id: this.id})
        .subscribe((res: any) => {
          this.user = res.data;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      date: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onChange(result: Date): void {
    console.log('selected time: ', result);
  }

  update() {
    this.http.post('http://localhost:8080/user/detail', this.user).subscribe((res: any) => {
      if (res.data) {
        this.router.navigate(['/sys/user/user-list']);
      }
    })
  }
}
