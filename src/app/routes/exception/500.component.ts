import { Component } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';

@Component({
  selector: 'exception-500',
  template: ` <exception type="500" style="min-height: 500px; height: 80%;"></exception> `,
})
export class Exception500Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
