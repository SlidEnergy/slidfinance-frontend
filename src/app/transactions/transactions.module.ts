import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { Routes, RouterModule } from '@angular/router';
import { BanksPageComponent } from './banks-page/banks-page.component';
import { BankListComponent } from './bank-list/bank-list.component';

const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: 'banks', component: BanksPageComponent },
];

@NgModule({
  declarations: [TransactionsPageComponent, TransactionsHistoryComponent, BanksPageComponent, BankListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionsModule { }
