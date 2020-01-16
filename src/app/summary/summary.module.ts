import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SummaryPageComponent} from './summary-page.component';
import { WhichCardToPayComponent } from './which-card-to-pay.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryPageComponent
  },
];

@NgModule({
  declarations: [SummaryPageComponent, WhichCardToPayComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SummaryModule {
}
