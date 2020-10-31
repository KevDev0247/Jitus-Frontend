import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-account-settings',
  templateUrl: './project-account-settings.component.html',
  styleUrls: ['project-account-settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectAccountSettingsComponent implements AfterViewInit, OnDestroy {

  private resize$: Subscription;
  private router$: Subscription;

  mode = 'inline';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'base',
      title: 'Basic',
    },
    {
      key: 'security',
      title: 'Security',
    },
    {
      key: 'binding',
      title: 'Binding',
    },
    {
      key: 'notification',
      title: 'Notification',
    }
  ];

  constructor(
    private router: Router,
    private changeDetectorRef,
    private elementRef: ElementRef
  ) {
    this.router$ = this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      .subscribe(() => this.setActive());
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
    this.title = this.menus.find(w => w.selected).title;
  }

  toAccount(item: any) {
    this.router.navigateByUrl(`/project/account/settings/${item.key}`);
  }

  private resize() {
    const elementList = this.elementRef.nativeElement as HTMLElement;
    let mode = 'inline';
    const { offsetWidth } = elementList;

    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (offsetWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }

    this.mode = mode;
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }
}
