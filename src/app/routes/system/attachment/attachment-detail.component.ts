import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Attachments} from 'src/app/common/model/attachments';
import {AttachmentsService} from 'src/app/common/service/attachments.service';

@Component({
  selector: 'app-attachment-detail',
  templateUrl: './attachment-detail.component.html',
})
export class AttachmentsDetailComponent implements OnInit {

  form: FormGroup;
  attachments: Attachments = new Attachments();
  id: any;

  constructor(private fb: FormBuilder, private msg: NzMessageService,
              private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute,
              private router: Router, private sysAttachmentsService: AttachmentsService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });
    if (this.id) {
      this.sysAttachmentsService.detail(this.id).subscribe((res: any) => {
        this.attachments = res.data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fileid: [null, [Validators.required]],
      filename: [null, []],
      fileurl: [null, []],
      fileurlb: [null, []],
      fileurll: [null, []],
      fileurlm: [null, []],
      fileurls: [null, []],
      filetype: [null, []],
      filesize: [null, []],
      localpath: [null, []],
      previewurl: [null, []],
      pdfurl: [null, []],
      downloadurl: [null, []],
      shareCount: [null, []],
      downCount: [null, []],
      status: [null, []],
      userId: [null, []],
      extension: [null, []],
      createdtime: [null, []],
    });
  }

  transFormDateTimeStr(d: Date) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
      + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  save() {
    if (this.attachments.fileid) {
      this.sysAttachmentsService.update(this.attachments).subscribe(res => {
        if (res.data) {
          this.router.navigate(['/sys/attachment/list']);
        }
      });
    } else {
      this.sysAttachmentsService.create(this.attachments).subscribe(res => {
        if (res.data) {
          this.router.navigate(['/sys/attachment/list']);
        }
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
