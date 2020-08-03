import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {User} from '../../../common/model/User';
import {UserService} from '../../../common/service/userService';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {

  form: FormGroup;
  passwordForm: FormGroup;
  submitting = false;
  user: User = new User;
  id: any;
  password: string;
  newPassword: string;

  constructor(private fb: FormBuilder, private msgSrc: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.user;
    });
    if (this.id) {
      this.userService.detail(this.id)
        .subscribe((res: any) => {
          this.user = res.data;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  dateTimeToString(date: Date) {
    const dateTimeString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return dateTimeString;
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  update() {
    this.userService.update(this.user).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/pro/list/table-list']);
      }
    })
  }

  updatePassword() {
    this.userService.updatePasswd(this.id, this.password, this.newPassword)
      .subscribe((res: any) => {
        if (res.data) {
          this.msgSrc.success(res.message);
          this.router.navigate(['/pro/table-list'])
        } else {
          this.msgSrc.error(res.message);
        }
      })
  }

  goBack() {
    window.history.back();
  }
}
