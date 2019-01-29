import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { Routes, RouterModule } from '@angular/router';
import { BanksPageComponent } from './banks-page/banks-page.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { GeneratedRuleListComponent } from './generated-rule-list/generated-rule-list.component';
import { AddDialogComponent } from './dialogs/add-rule/add-rule-dialog.component';

const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: 'banks', component: BanksPageComponent },
  { path: 'rules', component: RulesPageComponent },
];

@NgModule({
  declarations: [
    TransactionsPageComponent,
    TransactionsHistoryComponent,
    BanksPageComponent, 
    BankListComponent,
    RulesPageComponent,
    RuleListComponent,
    GeneratedRuleListComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    AddDialogComponent
  ]
})
export class TransactionsModule { }
