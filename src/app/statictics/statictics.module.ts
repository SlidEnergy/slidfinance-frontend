import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoryStatisticPageComponent } from './category-statistic/category-statistic-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryStatisticComponent } from './category-statistic/category-statistic.component';
import { TransactionListDialogComponent } from './category-statistic/transaction-list-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full' },
  { path: 'category', component: CategoryStatisticPageComponent },
];

@NgModule({
  declarations: [
    CategoryStatisticPageComponent,
    CategoryStatisticComponent,
    TransactionListDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    TransactionListDialogComponent
  ]
})
export class StaticticsModule { }
