import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
import {Contact} from '../../common/model/contact';
import {ContactService} from '../../common/service/contact.service';

/**
 * The component class that define and control the views of the ContactDetail component
 *
 * @Author Yonggang Su
 * Created on 2020/08/17
 */
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {

  form: FormGroup;
  contact: Contact = new Contact();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private contactService: ContactService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.contactService.getDetails(this.id).subscribe((res: any) => {
        this.contact = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, []],
      dept: [null, []],
      profession: [null, []],
      telno: [null, []],
      email: [null, []],
      qq: [null, []],
      wechat: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.contactService.update(this.contact).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/contact/list']);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
