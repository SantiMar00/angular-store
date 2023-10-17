import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  }

  stores = [
    {
      "id": 1,
      "name": "Park Row at Beekman St",
      "address": "38 Park Row",
      "city": "New York",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 2,
      "name": "Store Alcalá",
      "address": "Calle de Alcalá, 21",
      "city": "Madrid",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 3,
      "name": "Chambers and West Broadway",
      "address": "125 Chambers Street",
      "city": "New York",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 4,
      "name": "Covent Garden - Russell St",
      "address": "10 Russell Street",
      "city": "London",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 5,
      "name": "Monmouth St",
      "address": "11 Monmouth Street",
      "city": "London",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    }
  ]

  onPickupOrDelivery(value: Boolean): void {
    console.log(value)
  }

}
