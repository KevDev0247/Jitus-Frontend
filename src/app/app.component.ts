import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {VERSION as VERSION_ALAIN, TitleService} from '@delon/theme';
import {VERSION as VERSION_ZORRO, NzModalService} from 'ng-zorro-antd';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleService: TitleService,
    private modalService: NzModalService,
  ) {
    renderer.setAttribute(elementRef.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(elementRef.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full)
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleService.setTitle();
      this.modalService.closeAll();
    });
  }
}
