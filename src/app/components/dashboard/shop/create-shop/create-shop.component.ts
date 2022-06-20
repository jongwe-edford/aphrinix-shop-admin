import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbStepChangeEvent, NbStepperComponent } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/interfaces/categories/response/category';
import { ShopCreation } from 'src/app/core/interfaces/shops/request/shop-creation';
import { CategoryService } from 'src/app/core/services/products/category.service';
import { ShopService } from 'src/app/core/services/shop/shop.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss'],
})
export class CreateShopComponent implements OnInit {
  linearMode = true;
  shopNameForm: FormGroup;
  shopNumberOfProducts: FormGroup;
  nummberOfManagersForm: FormGroup;
  shopCategoriesForm: FormGroup;
  shopTimeForm: FormGroup;
  private _selectedActivityIndex: number = 0;
  @Output() onSelectedActivityIndexChange = new EventEmitter();

  @Input()
  get selectedActivityIndex() {
    return this._selectedActivityIndex;
  }

  categories$: Observable<Category[]> = new Observable();

  changeEvent!: NbStepChangeEvent;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private shopService: ShopService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    // Shop name form
    this.shopNameForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
    });
    // Total products form
    this.shopNumberOfProducts = this.fb.group({
      productNumber: ['', Validators.required],
    });
    // Shop managers form
    this.nummberOfManagersForm = this.fb.group({
      managers: [0, [Validators.required]],
    });
    //Categories form
    this.shopCategoriesForm = this.fb.group({
      category: ['', [Validators.required]],
    });
    // Shop times form
    this.shopTimeForm = this.fb.group({
      openingTime: ['', [Validators.required]],
      closingTime: [''],
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  selectCategory(category: any) {
    console.log(category);
  }

  submitShopName() {
    if (this.shopNameForm.valid) {
      console.log('Shop name form');
      console.log(this.shopNameForm.value);
      this._selectedActivityIndex++;
    }
  }

  submitProductTotals() {
    if (this.shopNumberOfProducts.valid) {
      console.log(
        'Numbers ',
        this.shopNumberOfProducts.get('productNumber')?.value
      );
      console.log('Shop product totals');
      console.log(this.shopNumberOfProducts.value);
      this._selectedActivityIndex++;
    }
  }

  submitShopManagers() {
    if (this.nummberOfManagersForm.valid) {
      this.nummberOfManagersForm.get('managers')?.value;
      console.log('Shop managers form');
      console.log(this.nummberOfManagersForm.value);
      this._selectedActivityIndex++;
    }
  }

  submitShopCategory() {
    if (this.shopCategoriesForm.valid) {
      console.log(this.shopCategoriesForm.get('category')?.value);
      console.log('Shop category form');
      console.log(this.shopCategoriesForm.value);
      this._selectedActivityIndex++;
    }
  }

  submitShopTimesForm() {
    this.spinner.show();
    const shopRequest: ShopCreation = {
      name: this.shopName,
      numberOfManagers: this.numberOfManagers,
      closingTime: this.closingTime,
      openingTime: this.openingTime,
      phoneNumber: this.phoneNumber,
    };
    console.log(shopRequest);

    this.shopService.createShop(shopRequest).subscribe(
      (res) => {
        console.log(res);
        this.spinner.hide();
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  public get shopName(): string {
    return this.shopNameForm.get('name')?.value;
  }

  public get phoneNumber(): string {
    return this.shopNameForm.get('phoneNumber')?.value;
  }

  public get productNumbers(): string {
    return this.shopNumberOfProducts.get('productNumber')?.value;
  }

  public get numberOfManagers(): number {
    return this.nummberOfManagersForm.get('managers')?.value;
  }

  public get products(): string {
    return this.shopNumberOfProducts.get('productNumber')?.value;
  }

  public get openingTime(): string {
    return this.shopTimeForm.get('openingTime')?.value;
  }

  public get closingTime(): string {
    return this.shopTimeForm.get('closingTime')?.value;
  }

  getCategories() {
    this.categories$ = this.categoryService.getAllCategories();
    this.categoryService.getAllCategories().subscribe((res) => {
      console.log('Categories ', res);
    });
  }
  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
  }
}
