import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TransactionsPageComponent} from './transactions/transactions-page.component';
import {TransactionsEditableListComponent} from './transactions/editable-list/transactions-editable-list.component';
import {Routes, RouterModule} from '@angular/router';
import {BanksPageComponent} from './banks/banks-page.component';
import {BankListComponent} from './banks/bank-list.component';
import {RulesPageComponent} from './rules/rules-page.component';
import {RuleListComponent} from './rules/rule-list.component';
import {GeneratedRuleListComponent} from './rules/generated-rule-list.component';
import {AddRuleDialogComponent} from './rules/dialogs/add-rule-dialog.component';
import {DeleteRuleDialogComponent} from './rules/dialogs/delete-rule-dialog.component';
import {EditRuleDialogComponent} from './rules/dialogs/edit-rule-dialog.component';
import {CategoriesPageComponent} from './categories/categories-page.component';
import {CategoryListComponent} from './categories/category-list.component';
import {AddCategoryDialogComponent} from './categories/dialogs/add-category-dialog.component';
import {EditCategoryDialogComponent} from './categories/dialogs/edit-category-dialog.component';
import {AddBankDialogComponent} from './banks/dialogs/add-bank-dialog.component';
import {EditBankDialogComponent} from './banks/dialogs/edit-bank-dialog.component';
import {AddAccountDialogComponent} from './banks/card/dialogs/add-account-dialog.component';
import {EditAccountDialogComponent} from './banks/card/dialogs/edit-account-dialog.component';
import {AccountListComponent} from './banks/card/account-list.component';
import {BankCardComponent} from './banks/card/bank-card.component';
import {AddTransactionPageComponent} from './transactions/add-transaction/add-transaction-page.component';
import {SelectCategoryComponent} from './transactions/add-transaction/select-category.component';
import {AddTransactionComponent} from './transactions/add-transaction/add-transaction.component';
import {DeleteCategoryDialogComponent} from './categories/dialogs/delete-category-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: BanksPageComponent,
    children: [
      {
        path: ':id/accounts',
        component: BankCardComponent
      }
    ]
  },
  {
    path: ':id/accounts/:accountId/transactions',
    component: AddTransactionPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'new/select-category'
      },
      {
        path: 'new',
        redirectTo: 'new/select-category'
      },
      {
        path: 'new/select-category',
        component: SelectCategoryComponent
      },
      {
        path: 'new/add-transaction',
        component: AddTransactionComponent
      }
    ]
  },
  {path: 'transactions', component: TransactionsPageComponent},
  {path: 'rules', component: RulesPageComponent},
  {path: 'categories', component: CategoriesPageComponent}
];

@NgModule({
  declarations: [
    TransactionsPageComponent,

    TransactionsEditableListComponent,
    BanksPageComponent,
    BankListComponent,
    RulesPageComponent,
    RuleListComponent,
    GeneratedRuleListComponent,
    AddRuleDialogComponent,
    DeleteRuleDialogComponent,
    EditRuleDialogComponent,
    CategoriesPageComponent,
    CategoryListComponent,

    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    DeleteCategoryDialogComponent,

    AddBankDialogComponent,
    EditBankDialogComponent,

    AccountListComponent,
    BankCardComponent,
    AddAccountDialogComponent,
    EditAccountDialogComponent,
    AddTransactionPageComponent,
    SelectCategoryComponent,
    AddTransactionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    AddRuleDialogComponent,
    EditRuleDialogComponent,
    DeleteRuleDialogComponent,

    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    DeleteCategoryDialogComponent,

    AddBankDialogComponent,
    EditBankDialogComponent,

    AddAccountDialogComponent,
    EditAccountDialogComponent,
  ]
})
export class BanksModule {
}
