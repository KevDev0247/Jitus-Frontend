import { Component } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/ng-zorro-antd.module';

@Component({
  selector: 'exception-404',
  template: ` <exception type="404" style="min-height: 500px; height: 80%;"></exception> `,
})
export class Exception404Component {
  constructor(modalService: NzModalService) {
    modalService.closeAll();
  }
}
