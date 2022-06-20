import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ShopManager } from 'src/app/core/interfaces/shops/response/shop-manager';
import { ShopManagerService } from 'src/app/core/services/shop/shop-manager.service';
import { ShopStorageService } from 'src/app/core/services/shop/shop-storage.service';
import { NewManagerComponent } from './new-manager/new-manager.component';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss'],
})
export class HrComponent implements OnInit {
  isList: number = 0;
  table_interact1: boolean = false;
  table_interact2: boolean = false;
  table_interact3: boolean = false;
  table_interact4: boolean = false;
  table_interact5: boolean = false;
  table_interact6: boolean = false;
  table_interact7: boolean = false;

  shopManagers$: Observable<ShopManager[]> = new Observable();
  constructor(
    private dialogService: NbDialogService,
    private shopManagerService: ShopManagerService,
    private shopStorage: ShopStorageService
  ) {}

  ngOnInit(): void {
    console.log('Shop id ', this.shopStorage.shopId());

    this.shopManagers$ = this.shopManagerService.shopManagerList(
      this.shopStorage.shopId()
    );
  }

  openNewManagerDialog() {
    this.dialogService.open(NewManagerComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
      context: {},
    });
  }
  checkAll(value: any) {
    this.table_interact1 = value;
    this.table_interact2 = value;
    this.table_interact3 = value;
    this.table_interact4 = value;
    this.table_interact5 = value;
    this.table_interact6 = value;
    this.table_interact7 = value;
  }

  closeDialog() {}
}
