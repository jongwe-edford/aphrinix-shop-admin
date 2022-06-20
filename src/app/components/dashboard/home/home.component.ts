import { Component, Inject, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbSearchService,
  NbSidebarService,
  NB_WINDOW,
} from '@nebular/theme';
import { filter, map } from 'rxjs';
import { User } from 'src/app/core/interfaces/auth/response/user';
import { ShopCreation } from 'src/app/core/interfaces/shops/request/shop-creation';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ShopStorageService } from 'src/app/core/services/shop/shop-storage.service';
import { ShopService } from 'src/app/core/services/shop/shop.service';
import { CreateShopComponent } from '../shop/create-shop/create-shop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  toggled: boolean = false;
  isManager: boolean = false;
  items: NbMenuItem[] = [];
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    photoUrl: '',
    shopId: '',
    enabled: false,
    phoneNumber: '',
    roles: [],
  };
  shop: any;
  isShopPresent: boolean = false;
  value = '';
  constructor(
    private sidebarService: NbSidebarService,
    private searchService: NbSearchService,
    public shopStorageService: ShopStorageService,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private authService: AuthenticationService,
    private shopService: ShopService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }

  contextMenuItems: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: 'dashboard/user/profile',
    },

    {
      title: 'Logout',
      icon: 'log-out-outline',
    },
  ];

  shopContextMenu: NbMenuItem[] = [
    { title: 'Setting', icon: 'settings', link: 'dashboard/shop/settings' },
  ];
  ngOnInit() {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe();

    this.currentUser();
    console.log('Manager status ', this.isManager);
  }

  toggle() {
    this.sidebarService.toggle();
    console.log(this.sidebarService.getSidebarResponsiveState());

    this.toggled = !this.toggled;
  }

  openShopCreationDialog() {
    this.dialogService.open(CreateShopComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
      context: {},
    });
  }

  currentUser() {
    this.authService.currentUser().subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
      },
      (error) => {},
      () => {
        this.user.roles.map((role) => {
          if (role.role === 'ROLE_SHOP_MANAGER') {
            this.isManager = true;
            this.findShopById();
          } else {
            this.isManager = false;
            this.findShopByAdmin();
          }
          console.log('Manager status ', this.isManager);
          this.siderbarMenuItems();
        });
      }
    );
  }

  createShop() {
    const request: ShopCreation = {
      name: 'Edford',
    };

    this.shopService.createShop(request).subscribe((response) => {
      this.shopStorageService.createShop();
    });
  }

  public findShopByAdmin() {
    const email = this.user.email;
    console.log(email);

    this.shopService.findShopByAdmin().subscribe(
      (response) => {
        this.shop = response;
        this.shopStorageService.saveShopId(this.shop.shopId);
        console.log(response);
        this.isShopPresent = true;
        console.log('Shop present ', this.isShopPresent);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  findShopById() {
    const id = this.user.shopId;
    console.log('user ', this.user);

    console.log('Shop id ', id);

    this.shopService.finShopByShopId(id).subscribe(
      (response) => {
        this.shop = response;
        this.shopStorageService.saveShopId(this.shop.shopId);
        console.log(response);
        this.isShopPresent = true;
        console.log('Shop present ', this.isShopPresent);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  siderbarMenuItems() {
    this.items = [
      {
        title: 'Create shop',
        icon: 'plus-outline',
        link: 'shop/create',
        hidden: !this.isShopPresent,
      },
      {
        title: 'Home',
        icon: 'home-outline',
        link: 'home',
      },
      {
        title: 'Products',
        icon: 'shopping-bag-outline',
        children: [
          {
            title: 'Add product',
            icon: 'plus-outline',
            link: 'products/new',
          },
          {
            title: 'All products',
            icon: 'shopping-cart-outline',
            link: 'products',
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
            hidden: this.isManager,
            title: 'HR Report',
          },
        ],
      },
      {
        title: 'Admin/HR',
        icon: 'people-outline',
        link: 'hr',
        hidden: this.isManager,
      },
    ];
  }
}
