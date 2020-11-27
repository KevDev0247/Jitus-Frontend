import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd';
import {zip} from 'rxjs';
import {User} from '../../../../common/model/user';
import {UserService} from '../../../../common/service/user.service';

/**
 * The component class that define and control the views of the base.
 *
 * @Author Kevin Zhijun Wang
 * Created on 2020/10/31
 */
@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectAccountSettingsBaseComponent implements OnInit {

  avatar = '';
  isLoadingUser = true;
  user: User = new User;

  provinces: any[] = [];
  cities: any[] = [];

  constructor(
    private http: _HttpClient,
    private changeDetectionRef: ChangeDetectorRef,
    private messageService: NzMessageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getDetails(2)
      .subscribe(res => {
        this.isLoadingUser = false;
        this.user = res.data;
        this.changeDetectionRef.detectChanges();
      });
  }

  chosenProvince(pid: string, cleanCity = true) { }

  save() {
    this.userService.update(this.user).subscribe(res => {
      if (res.data) {
        this.messageService.success('Update successful');
      } else {
        this.messageService.success('Update failed');
      }
    });
    this.changeDetectionRef.detectChanges();
  }
}
