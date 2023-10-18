import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { NgForm } from '@angular/forms';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  };

  isDelivery = true;

  cart: Product[] = []

  stores: Store[] = [];

  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService, private router: Router) {}

  ngOnInit(): void {
    this.getStores()
    this.getCartData()
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value
  }

  onSubmit({value: formData}: NgForm): void {
    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      switchMap(({ id: orderId }) => {
        const details = this.prepareDetails()
        return this.dataSvc.saveDetailsOrders({details, orderId})
      }),
      tap( () => this.router.navigate(['/thank-you-page'])),
    )
    .subscribe()
  }

  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((stores: Store[]) => (this.stores = stores)))
      .subscribe()
  }

  private getCurrentDate(): string {
    return new Date().toLocaleDateString()
  }

  private prepareDetails(): Details[] {
    const details: Details[] = []
    this.cart.forEach((product: Product) => {
      const {id: productId, name: productName, qty: quantity, stock} = product
      details.push({productId, productName, quantity})
    })
    return details
  }

  private getCartData(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }

}
