import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MccPageComponent } from './mcc-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'mcc',
    component: MccPageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent, MccPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
