import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../Models/product';
@Component({
  selector: 'app-card-component',
  imports: [CurrencyPipe],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  @Input() product!: Product;

  get finalPrice(): number {
    return this.product.price - (this.product.price * this.product.discount / 100);
  }
}
