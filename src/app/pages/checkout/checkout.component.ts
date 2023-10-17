import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/store.interface';

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

  isDelivery = false;

  stores: Store[] = [];

  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {
    this.getStores();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit(): void {
    console.log('GOL');
  }

  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((stores: Store[]) => (this.stores = stores)))
      .subscribe();
  }
}
