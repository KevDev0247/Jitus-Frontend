import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/model/Product';
import { ProductService } from 'src/app/common/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  form: FormGroup;
  product: Product = new Product();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
    private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
    private router: Router, private productService: ProductService,) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.productService.detail(this.id).subscribe((res: any) => {
        this.product = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, []],
      serialNo: [null, []],
      spec: [null, []],
      type: [null, []],
      brand: [null, []],
      produceTime: [null, []],
      description: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  transFormDateTimeStr(d: Date) {
    const datetimeStr =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds();
    return datetimeStr;
  }

  save() {
    if (this.product.id) {
      this.productService.update(this.product).subscribe(res => {
        if (res.data) {
          this.router.navigate(['/product/list']);
        }
      });
    } else {
      this.productService.create(this.product).subscribe(res => {
        if (res.data) {
          this.router.navigate(['/product/list']);
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
