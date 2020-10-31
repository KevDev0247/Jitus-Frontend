import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {zip} from 'rxjs';

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectAccountBaseComponent implements OnInit {

  avatar = '';
  isLoadingUser = true;
  user: any;

  provinces: any[] = [];
  cities: any[] = [];

  constructor(
    private http: _HttpClient,
    private changeDetectionRef,
    private messageService: NzMessageService
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
