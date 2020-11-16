import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {type} from 'os';
import {Project} from '../../common/model/project';
import {ClientService} from '../../common/service/client.service';
import {ContractService} from '../../common/service/contract.service';
import {ProjectService} from '../../common/service/project.service';
import {CommonUtils} from '../../common/util/common.utils';

/**
 * The component class that define and control the views of the ProjectDetail component
 *
 * @Author Yonggang Su
 * Created on 2020/08/10
 */
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styles: [
    `
      :host ::ng-deep .upload-list-inline .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
      }
      :host ::ng-deep .upload-list-inline [class*='-upload-list-rtl'] .ant-upload-list-item {
        float: right;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-enter {
        animation-name: uploadAnimateInlineIn;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-leave {
        animation-name: uploadAnimateInlineOut;
      }
    `,
  ],
})
export class ProjectDetailComponent implements OnInit {

  formGroup: FormGroup;
  id: any;
  result: any;
  project: Project = new Project();
  fileList = [];
  comUtils: CommonUtils = new CommonUtils();
  deliveryTime?: Date;
  acceptTime?: Date;
  guaranteeDueTime?: Date;

  contractName: string;
  clientName: string;
  title: string;
  category = 'project';
  typeId = 0;
  isVisible = false;

  listOfOption: Array<{ value: string; text: string}> = [
    { value: '11', text: '11' },
    { value: '22', text: '22' },
  ];
  contractOptions: Array<{ id: number; name: string }> = [];
  clientOptions: Array<{ id: number; name: string }> = [];
  listOfTagOption: any;
  contractOption: any;
  clientOption: any;
  selectedValue = null;
  nzFilterOption = () => true;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private projectService: ProjectService,
              private contractService: ContractService, private clientService: ClientService,
              private httpClient: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.projectService.getDetails(this.id).subscribe((res: any) => {
        this.project = res.data;
      });
    }
    this.getContractOptions('');
    this.getClientOptions('');
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

  update() {
    this.projectService.update(this.project).subscribe(res => {
      if (res.data) {
        this.router.navigate(['/project/list']);
      }
    })
  }

  search(value: string, typeId: number): void {
    if (typeId === 1) {
      this.getContractOptions(value);
    }
    if (typeId === 2) {
      this.getClientOptions(value);
    }
  }

  save() {
    console.log('>>>>res', this.result);
    // this.project.deliveryTime = this.comUtils.transFormDateTimeStr(this.deliveryTime);
    // this.project.acceptTime = this.comUtils.transFormDateTimeStr(this.acceptTime);
    // this.project.guaranteeDueTime = this.comUtils.transFormDateTimeStr(this.guaranteeDueTime);
    // if (this.project.id) {
    //   this.projectService.update(this.project).subscribe(res => {
    //     if (res.data) {
    //       this.router.navigate(['/project/list']);
    //     }
    //   });
    // } else {
    //   this.projectService.create(this.project).subscribe(res => {
    //     if (res.data) {
    //       this.router.navigate(['/project/list']);
    //     }
    //   });
    // }
  }

  goBack() {
    window.history.back();
  }

  getContractOptions(name: string) {
    this.contractService.getOptionList(name).subscribe(res => {
      this.contractOptions = res.list;
    });
  }

  getClientOptions(info: string) {
    this.clientService.getOptionList(info).subscribe(res => {
      this.clientOption = res.list;
    });
  }

  handleChange(info: any): void {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (info.file.status === 'done') {
    //   this.msg.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   this.msg.error(`${info.file.name} file upload failed.`);
    // }

    if (info.file.status === 'done') {
      console.log('>>>Res info', info.file.response);
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOpen(typeId?: number) {
    this.typeId = typeId;
    if (typeId === 1) {
      this.title = 'Contract';
    }
    if (typeId === 2) {
      this.title = 'Client';
    }
    this.isVisible = true;
  }

  getChildEvent(index: any) {
    if (index.type === 1) {
      this.contractName = index.item.name;
      this.project.contractId = index.item.id;
    }
    if (index.type === 2) {
      this.clientName = index.item.name;
      this.project.clientId = index.item.id;
    }
    this.isVisible = false;
  }
}
