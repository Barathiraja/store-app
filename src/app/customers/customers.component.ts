import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Customer from '../models/customer.model';
import { StoreService } from '../services/stores.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  constructor(private route: ActivatedRoute,  private router: Router, private service: StoreService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service
        .getCustomers(params['id'])
        .subscribe((data: Customer[]) => {
          this.customers = data;
          console.log(this.customers);
        });
    });
  }

  goToStores() {
    this.router.navigate(['stores']);
  }

}
