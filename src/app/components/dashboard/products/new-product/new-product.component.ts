import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/interfaces/categories/response/category';
import { NewProductRequest } from 'src/app/core/interfaces/products/request/new-product-request';
import { CategoryService } from 'src/app/core/services/products/category.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { ShopStorageService } from 'src/app/core/services/shop/shop-storage.service';
import { ImagePickerConf, NgpImagePickerComponent } from 'ngp-image-picker';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  hasMoreInfo: boolean = false;
  tags: Set<string> = new Set();
  colors: Set<string> = new Set();
  sizes: Set<string> = new Set();
  categories$: Observable<Category[]> = new Observable<Category[]>();
  newProductForm: FormGroup;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  formData: FormData = new FormData();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private shopStorageService: ShopStorageService
  ) {
    this.newProductForm = fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      tags: [''],
      colors: [''],
      sizes: [''],
      categories: ['', Validators.required],
      quantity: ['', Validators.required],
      total: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }
  onColorRemove(tagToRemove: NbTagComponent): void {
    this.colors.delete(tagToRemove.text);
  }
  onSizeRemove(tagToRemove: NbTagComponent): void {
    this.sizes.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.tags.add(value);
    }
    input.nativeElement.value = '';
  }
  onColorAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.colors.add(value);
    }
    input.nativeElement.value = '';
  }
  onSizeAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.sizes.add(value);
    }
    input.nativeElement.value = '';
  }

  changeHasMoreInfoValue() {
    this.hasMoreInfo = !this.hasMoreInfo;
    console.log('Has more info ', this.hasMoreInfo);
  }

  addNewProduct() {
    console.log(this.newProductForm.value);

    if (this.newProductForm.valid) {
      const productRequest: NewProductRequest = {
        name: this.name,
        price: this.price,
        tags: this.tags,
        sizes: this.sizes,
        categories: this.categoriesValue as unknown as string[],
        colors: this.colors,
        quantity: this.quantity,
        shortDescription: this.shortDescription,
        longDescription: this.longDescription,
        total: this.total,
        shopId: this.shopStorageService.shopId(),
      };

      const productJson = new Blob([JSON.stringify(productRequest)], {});

      this.formData.append('product', productJson);

      this.productService.addNewProduct(this.formData).subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onImageChange(event: any) {
    console.log(event);
  }
  getCategories() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.formData.append('images', event.target.files[i]);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  public get name(): string {
    return this.newProductForm.get('name')?.value;
  }
  public get price(): number {
    return this.newProductForm.get('price')?.value;
  }
  public get quantity(): number {
    return this.newProductForm.get('quantity')?.value;
  }
  public get total(): number {
    return this.newProductForm.get('total')?.value;
  }
  public get shortDescription(): string {
    return this.newProductForm.get('shortDescription')?.value;
  }
  public get longDescription(): string {
    return this.newProductForm.get('longDescription')?.value;
  }
  public get tagsValue(): string {
    return this.newProductForm.get('tags')?.value;
  }
  public get colorsValue(): string {
    return this.newProductForm.get('name')?.value;
  }
  public get sizesValue(): string {
    return this.newProductForm.get('name')?.value;
  }
  public get categoriesValue(): string {
    return this.newProductForm.get('categories')?.value;
  }
}
