import { Injectable } from '@angular/core';
import Store from '../models/store.model';
import { ApiService } from '../common/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  uri = 'http://localhost:30301/api/v1/stores';
  constructor(private apiservice: ApiService) { }
  getStores() {
    return this
      .apiservice
      .get(`${this.uri}`);
  }
  updateStore(store: Store) {
    delete store['_id'];
    return this
      .apiservice
      .put(`${this.uri}/${store.Id}`, store);
  }
  searchStore(searchterm: string) {
    return this
      .apiservice
      .get(`${this.uri}?search=${searchterm}`);
  }

  getCustomers(id: number) {
    return this
      .apiservice
      .get(`${this.uri}/${id}/customers`);
  }
}
