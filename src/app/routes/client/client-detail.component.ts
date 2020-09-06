import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Client} from '../../common/model/client';
import {ClientService} from '../../common/service/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit{

  form: FormGroup;
  client: Client = new Client();
  id: any;
  roleIds: Array<{ value: number; text: string }> = [
    { value: 7, text: 'Commercial Clients' },
    { value: 8, text: 'Domesticate Clients' },
    { value: 9, text: 'Project Clients' },
  ];

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute, private router: Router, private clientService: ClientService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });

    if (this.id) {
      this.clientService.getDetail(this.id).subscribe((res: any) => {
        this.client = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, []],
      telno: [null, []],
      area: [null, []],
      roleId: [null, []],
      address: [null, []],
      remark: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  create() {
    this.clientService.create(this.client).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/client/list']);
      }
    })
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.clientService.update(this.client).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/client/list']);
      }
    })
  }

  goBack() {
    window.history.back();
  }
}
