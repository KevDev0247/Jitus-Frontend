import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd';
import {zip} from 'rxjs';

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
  user: any;

  provinces: any[] = [];
  cities: any[] = [];

  constructor(
    private http: _HttpClient,
    private changeDetectionRef: ChangeDetectorRef,
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    zip(this.http.get('/user/current'), this.http.get('/geo/province'))
      .subscribe(([user, provinces]: any) => {
        this.isLoadingUser = false;
        this.user = user;
        this.provinces = provinces;
        this.chosenProvince(user.geographic.province.key, false);
        this.changeDetectionRef.detectChanges();
      });
  }

  chosenProvince(pid: string, cleanCity = true) {
    this.http.get( `/geo/${pid}`).subscribe((response: any) => {
      this.cities = response;
      if (cleanCity) {
        this.user.geographic.city.key = '';
        this.changeDetectionRef.detectChanges();
      }
    });
  }

  save() {
    this.messageService.success(JSON.stringify(this.user));
    return false;
  }
}