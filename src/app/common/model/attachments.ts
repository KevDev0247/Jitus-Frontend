import {BaseModule} from './base.module';

export class Attachments extends BaseModule {
  fileid?: number;
  filename?: string;
  fileurl?: string;
  fileurlb?: string;
  fileurll?: string;
  fileurlm?: string;
  fileurls?: string;
  filetype?: string;
  filesize?: number;
  localpath?: string;
  previewurl?: string;
  pdfurl?: string;
  downloadurl?: string;
  shareCount?: number;
  downCount?: number;
  status?: string;
  userId?: number;
  extension?: string;
  createdtime?: Date;
}
