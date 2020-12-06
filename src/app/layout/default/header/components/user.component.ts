import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <!--<nz-avatar [nzSrc]="avatar" nzSize="small" class="mr-sm"></nz-avatar>-->
      <img src="{{ avatar }}" />
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu style="width: 180px">
        <div nz-menu-item>
          <img src="assets/imgs/header/department.svg">
          &nbsp;&nbsp;Change Department
        </div>
        <div nz-menu-item (click)="updatePassword()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          Change Password
        </div>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          Logout
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {

  avatar = 'assets/imgs/header/user.svg';

  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  updatePassword() {
    this.router.navigate(['/sys/user/update']);
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
