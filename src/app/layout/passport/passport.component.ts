import { Component } from '@angular/core';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
  links = [
    {
      title: 'Help',
      href: '',
    },
    {
      title: 'Privacy',
      href: '',
    },
    {
      title: 'Terms',
      href: '',
    },
  ];
}
