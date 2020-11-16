import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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

  title: string;

  menus: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Work Orders' },
    { id: 2, name: 'Departments' },
    { id: 3, name: 'Projects' },
    { id: 4, name: 'Knowledge' },
    { id: 5, name: 'Information' },
    { id: 6, name: 'Accessory' },
    { id: 1, name: 'Work Orders' },
  ];
  isVisible = false;

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void { }

  handleOpen(type: number): void {
    if (type === 1) {
      this.title = 'Add Service Modules';
    }
    if (type === 2) {
      this.title = 'All Service Modules';
    }
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  log(value: string[]): void {
    console.log(value);
  }
}
