import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss'],
})
export class CreateShopComponent implements OnInit {
  linearMode = true;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  constructor() {}

  ngOnInit(): void {}
}
