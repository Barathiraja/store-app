import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { AppToastsComponent } from './common/components/toastercontainer.component';
import { StoreService } from './services/stores.service';
import { ApiService } from './common/services/api.service';
import { AppToastService } from './common/services/apptoast.service';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    AppToastsComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AppToastService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
