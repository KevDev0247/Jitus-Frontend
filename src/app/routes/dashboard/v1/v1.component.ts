import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .grid-config {
        height: 120px;
        width: 250px;
        font-size: 14px;
        line-height: 120px;
        border-radius: 4px;
      }
    `,
  ],
})
export class DashboardV1Component implements OnInit {

  webSite: any[];
  salesData: any[];
  offlineChartData: any[];
  chart = '';
  customStyle = {
    'border-radius': '4px',
    'margin-bottom': '24px',
    border: '0px',
  };
  hGutter = 32;
  vGutter = 32;

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get('/chart').subscribe((response: any) => {
      this.webSite = response.visitData.slice(0, 10);
      this.salesData = response.data;
      this.offlineChartData = response.offlineChartData;
      this.cdr.detectChanges();
    });
  }
}
