import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MccPageComponent } from './mcc/mcc-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { MccListComponent } from './mcc/mcc-list.component';
import { MerchantsPageComponent } from './merchants/merchants-page.component';
import { MerchantListComponent } from './merchants/merchant-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'mcc',
    component: MccPageComponent
  },
  {
    path: 'merchants',
    component: MerchantsPageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent, MccPageComponent, MccListComponent, MerchantsPageComponent, MerchantListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
