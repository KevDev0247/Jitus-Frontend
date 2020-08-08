import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {Menu} from '../../../common/model/menu';
import {MenuService} from '../../../common/service/menu.service';

/**
 * The component class that define and control the views of the menu details.
 *
 * @Author Kevin Zhijun Wang
 * @version 2020.0807
 */
@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent implements OnInit {

  form: FormGroup;
  menu: Menu = new Menu();
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: NzMessageService,
    private changeDetectorRef: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.menuService.detail(this.id)
        .subscribe((response: any) => {
          this.menu = response.data;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      link: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      orderNumber: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  save() {
    if (!this.id) {
      this.menuService.create(this.menu).subscribe(response => {
        if (response.data) {
          this.router.navigate(['/menu/menu-list']);
        }
        return;
      });
    }
    this.menuService.update(this.menu).subscribe(response => {
      if (response.data) {
        this.router.navigate(['/menu/menu-list']);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
