import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Project} from '../../common/model/project';
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

  listOfOption: Array<{ value: string; text: string}> = [];
  listOfTagOption: any;
  selectedValue = null;
  nzFilterOption = () => true;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private projectService: ProjectService,
              private httpClient: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.projectService.getDetails(this.id).subscribe((response: any) => {
        this.project = response.data;
      });
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [null, []],
      contractId: [null, []],
      description: [null, []],
      listOfTagOption: [null, []],
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

    // const children: Array<{ label: string; value: string }> = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    // }
    // this.listOfOption = children;
  }

  create() {
    console.log('>>>>>res options>>>>', this.listOfTagOption);
    // this.project.contractStartTime = this.transFormDateTimeStr(this.contractStartTime);
    // this.project.contractEndTime = this.transFormDateTimeStr(this.contractEndTime);
    // this.projectService.create(this.project).subscribe(res => {
    //   if (res.data) {
    //     this.router.navigate(['/pro/list']);
    //   }
    // });
  }

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  search(value: string): void {
    const children: Array<{ value: string; text: string}> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ value: i.toString(36) + '66', text: i.toString(36) + i })
    }
    this.listOfOption = children;
  }

  goBack() {
    window.history.back();
  }
}
