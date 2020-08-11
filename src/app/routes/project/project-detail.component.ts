import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/ng-zorro-antd.module';
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

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private projectService: ProjectService) {
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

  transformDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  update() {
    this.projectService.update(this.project).subscribe(res => {
      this.router.navigate(['/project/project-list']);
    });
  }

  goBack() {
    window.history.back();
  }
}
