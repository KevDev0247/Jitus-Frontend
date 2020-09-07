import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Contract} from '../../../common/model/contract';
import {ContractService} from '../../../common/service/contract.service';

/**
 * The component class that define and control the views of the ContractDetail Component
 *
 * @Author Yonggang Su
 * Created on 2020/09/06
 */
@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {

  form: FormGroup;
  contract: Contract = new Contract();
  id: any;

  startDate?: Date;
  endDate?: Date;
  signDate?: Date;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private contractService: ContractService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.activatedRoute.queryParams.subscribe((res: any) => {
        this.contract = res.data;
        this.startDate = this.convertDateFromString(this.contract.startDate);
        this.endDate = this.convertDateFromString(this.contract.endDate);
        this.signDate = this.convertDateFromString(this.contract.signDate);
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      signPlace: [null, []],
      startDate: [null, []],
      endDate: [null, []],
      projectId: [null, []],
      clientId: [null, []],
      content: [null, []],
      pattern: [null, []],
      name: [null, []],
      address: [null, []],
      telno: [null, []],
      signDate: [null, []],
      signmanId: [null, []],
      status: [null, []],
      price: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
    });
  }

  convertDateFromString(dateString) {
    if (dateString) {
      return new Date(dateString.replace(/-/, '/'));
    }
  }

  transformDateTimeStr(d: Date) {
    if (!d) {
      return;
    }
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  create() {
    this.contract.startDate = this.transformDateTimeStr(this.startDate);
    this.contract.endDate = this.transformDateTimeStr(this.endDate);
    this.contract.signDate = this.transformDateTimeStr(this.signDate);
    console.log('>>>>res ', this.contract);
    this.contractService.create(this.contract).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/repair/contract/list']);
      }
    })
  }

  update() {
    this.contractService.update(this.contract).subscribe(res => {
      if (res.data) {
        this.router.navigate(['repair/contract/list']);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
