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

  offlineChartData: any[];
  chart = '';
  hGutter = 32;
  vGutter = 32;

  customStyle = {
    border: '0px',
    'border-top': '0px solid #d9d9d9',
  };

  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: {
        border: '0px',
      },
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        'border-top': '0px',
      },
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        border: '0px',
      },
    },
  ];

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { }
}
