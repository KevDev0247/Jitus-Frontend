import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Project} from '../../common/model/project';
import {ContractService} from '../../common/service/contract.service';
import {ProjectService} from '../../common/service/project.service';

/**
 * The component class that define and control the views of the ProjectDetail component
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

  formGroup: FormGroup;
  id: any;
  project: Project = new Project();
  contractStartTime?: Date;
  contractEndTime?: Date;

  listOfOption: Array<{ value: string; text: string}> = [
    { value: '11', text: '11' },
    { value: '22', text: '22' },
  ];
  contractOptions: Array<{ id: number; name: string }> = [];
  listOfTagOption: any;
  contractOption: any;
  selectedValue = null;
  nzFilterOption = () => true;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private projectService: ProjectService,
              private contractService: ContractService, private httpClient: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.projectService.getDetails(this.id).subscribe((res: any) => {
        this.project = res.data;
      });
    }
    this.getContractOptions('');
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [null, []],
      contractId: [null, []],
      description: [null, []],
      listOfTagOption: [null, []],
      contractOption: [null, []],
      address: [null, []],
      clientId: [null, []],
      createTime: [null, []],
      updateTime: [null, []],
      contractStartTime: [null, []],
      contractEndTime: [null, []],
      deliveryTime: [null, []],
      acceptTime: [null, []],
      guaranteeType: [null, []],
      guaranteeMonth: [null, []],
      guaranteeDueTime: [null, []],
      staffId: [null, []],
      fileId: [null, []],
    });
  }

  create() {
    console.log('>>>>>res options>>>>>', this.project);
    // this.project.contractStartTime = this.transformDateTimeStr(this.contractStartTime);
    // this.project.contractEndTime = this.transformDateTimeStr(this.contractEndTime);
    // this.projectService.create(this.project).subscribe(res => {
    //   if (res.data) {
    //     this.router.navigate(['/pro/list']);
    //   }
    // });
  }

  update() {
    this.projectService.update(this.project).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/project/list']);
      }
    })
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  search(value: string): void {
    console.log('>>>>search value>>>>', value)
    const children: Array<{ value: string; text: string}> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ value: i.toString(36) + '66', text: i.toString(36) + i })
    }
    this.listOfOption = children;
    this.getContractOptions(value);
  }

  goBack() {
    window.history.back();
  }

  getContractOptions(name: string) {
    this.contractService.getOptionList(name).subscribe(res => {
      this.contractOptions = res.list;
    });
  }
}
