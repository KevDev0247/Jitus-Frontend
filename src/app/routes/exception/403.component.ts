import { Component } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';

@Component({
  selector: 'exception-403',
  template: ` <exception type="403" style="min-height: 500px; height: 80%;"></exception> `,
})
export class Exception403Component {
  constructor(modalService: NzModalService) {
    modalService.closeAll();
  }
}
