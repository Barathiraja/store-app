import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CustomersComponent } from './customers/customers.component';


const routes: Routes = [
  {
    path: 'stores',
    component: StoreComponent
  },
  {
    path: 'customers/:id',
    component: CustomersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
