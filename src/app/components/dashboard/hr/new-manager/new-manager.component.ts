import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ShopStorageService } from 'src/app/core/services/shop/shop-storage.service';
import { ShopService } from 'src/app/core/services/shop/shop.service';

@Component({
  selector: 'app-new-manager',
  templateUrl: './new-manager.component.html',
  styleUrls: ['./new-manager.component.scss'],
})
export class NewManagerComponent implements OnInit {
  orderObj: any;
  newAdminForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private shopStorageService: ShopStorageService,
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<NewManagerComponent>
  ) {
    this.newAdminForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public get email(): string {
    return this.newAdminForm.get('email')?.value;
  }

  ngOnInit(): void {}

  sendLink() {
    if (this.newAdminForm) {
      this.shopService
        .sendShopManagerRegistrationLink(
          this.email,
          this.shopStorageService.shopId()
        )
        .subscribe(
          (res) => {
            this.dialogRef.close();
          },
          (err) => {}
        );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
