import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbMenuItem,
  NbSearchService,
  NbSidebarService,
} from '@nebular/theme';
import { ShopStorageService } from 'src/app/@core/services/shop/shop-storage.service';
import { CreateShopComponent } from '../shop/create-shop/create-shop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  value = '';
  constructor(
    private sidebarService: NbSidebarService,
    private searchService: NbSearchService,
    public shopStorageService: ShopStorageService,
    private dialogService: NbDialogService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }

  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'bar-chart-outline',
    },
    {
      title: 'Products',
      icon: 'shopping-bag-outline',
      children: [
        {
          title: 'Add product',
          icon: 'plus-outline',
        },
        {
          title: 'All products',
          icon: 'shopping-cart-outline',
        },
        {
          title: 'Categories',
          icon: 'grid-outline',
        },
      ],
    },
    {
      title: 'Orders',
      icon: 'car-outline',
      children: [
        {
          title: 'First Order',
        },
        {
          title: 'Second Order',
        },
        {
          title: 'Third Order',
        },
      ],
    },
    {
      title: 'Transactions',
      icon: 'bar-chart-2-outline',
      badge: { text: '5', status: 'success', dotMode: false },
    },
    {
      title: 'Reporting',
      icon: 'trending-down-outline',
      children: [
        {
          title: 'Product report',
        },
        {
          title: 'Sales report',
        },
        {
          title: 'HR Report',
        },
      ],
    },
    {
      title: 'Admin/HR',
      icon: 'people-outline',
    },
  ];

  ngOnInit(): void {
    this.items.forEach((i) => {});
  }

  toggle() {
    this.sidebarService.toggle();
  }

  openShopCreationDialog() {
    this.dialogService.open(CreateShopComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
      context: {},
    });
  }
}
