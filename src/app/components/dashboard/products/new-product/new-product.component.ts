import { Component, OnInit } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  constructor() {}

  trees: Set<string> = new Set();

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.trees.add(value);
    }
    input.nativeElement.value = '';
  }
  ngOnInit(): void {}
}
