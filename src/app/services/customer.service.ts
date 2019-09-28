import { Injectable } from '@angular/core';
import customer from '../models/customer.model';
import { ApiService } from '../common/services/api.service';
@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    uri = 'http://localhost:30301/api/v1/customers';
    constructor(private apiservice: ApiService) { }
    createCustomer(data: customer) {
        return this
            .apiservice
            .post(`${this.uri}`, data);
    }
}
