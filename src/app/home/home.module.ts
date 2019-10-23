import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MccPageComponent } from './mcc/mcc-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { MccListComponent } from './mcc/mcc-list.component';

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
  declarations: [HomePageComponent, MccPageComponent, MccListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
