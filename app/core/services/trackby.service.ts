import { Injectable } from '@angular/core';

import { ICustomer, IOrder } from '../../shared/interfaces/models';

@Injectable()
export class TrackByService {
  
  customer(index:number, customer: ICustomer) {
    return customer.ID;
  }

  order(index:number, order: IOrder) {
    return index;
  }

}