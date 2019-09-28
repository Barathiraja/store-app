import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import Store from '../models/store.model';
import customer from '../models/customer.model';
import { StoreService } from '../services/stores.service';
import { CustomerService } from '../services/customer.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from '../common/services/apptoast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stores-get',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnChanges {
  stores: Store[];
  closeResult: string;
  modalOptions: NgbModalOptions;
  submitted = false;
  storeToModify;
  searching = false;
  SearchFailed = false;
  customerForm: FormGroup;
  modalReference: any;
  @Input()
  model: any;
  constructor(
    private service: StoreService,
    private customerservice: CustomerService,
    private modalService: NgbModal,
    private toastService: AppToastService,
    private customerbuilder: FormBuilder
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  ngOnInit() {
    this.getAllStores();
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.prop);
  }
  public getAllStores() {
    this.service
      .getStores()
      .subscribe((data: Store[]) => {
        this.stores = data;
      });
  }
  public updateStore() {
    this.toastService.show('Store update success!', { classname: 'bg-success text-light', delay: 10000 });
    this.service
      .updateStore(this.storeToModify)
      .subscribe((data: Store[]) => {
        console.log(data);
        this.getAllStores();
      });
  }
  public open(content, store) {
    this.storeToModify = Object.assign({}, store);
    this.modalReference = this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.updateStore();
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }
  search = (searchTerm: string) => {
    this.service
      .searchStore(this.model)
      .subscribe((data: Store[]) => {
        this.stores = data;
      });
  }

  createForm() {
    this.customerForm = this.customerbuilder.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Phone: [''],
      Email: ['', Validators.required],
      Id: ['', Validators.required]

    });
  }

  createCustomer(Firstname, Lastname, Phone, Email, Id) {
    console.log(this.storeToModify);
    const customerData = {
      Firstname: Firstname,
      Lastname: Lastname,
      Phone: Phone,
      Email: Email,
      Id: Id,
      StoreId: this.storeToModify.Id
    };
    this.customerservice
      .createCustomer(customerData)
      .subscribe((data: customer[]) => {
        this.toastService.show('Customer creation success!', { classname: 'bg-success text-light', delay: 10000 });
        this.modalService.dismissAll();
        this.customerForm.reset();
      });
  }
}

