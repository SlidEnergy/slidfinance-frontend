import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TransactionsPageComponent} from './transactions/transactions-page.component';
import {TransactionsEditableListComponent} from './transactions/transactions-editable-list.component';
import {Routes, RouterModule} from '@angular/router';
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
import {AddAccountDialogComponent} from './accounts/dialogs/add-account-dialog.component';
import {EditAccountDialogComponent} from './accounts/dialogs/edit-account-dialog.component';
import {AccountListComponent} from './accounts/account-list.component';
import {AccountCardComponent} from './accounts/card/account-card.component';
import {AddTransactionPageComponent} from './transactions/add-transaction/add-transaction-page.component';
import {SelectCategoryComponent} from './transactions/add-transaction/select-category.component';
import {AddTransactionComponent} from './transactions/add-transaction/add-transaction.component';
import {DeleteCategoryDialogComponent} from './categories/dialogs/delete-category-dialog.component';
import {AccountsPageComponent} from './accounts/accounts-page.component';
import {AccountSettingsComponent} from './accounts/card/account-settings.component';
import {TariffComponent} from './accounts/card/tariff/tariff.component';
import {AddProductDialogComponent} from './accounts/card/tariff/dialogs/add-product-dialog.component';
import { CashbackCategoryComponent } from './accounts/card/tariff/cashback/cashback-category.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPageComponent,
    children: [
      {
        path: ':id/accounts',
        component: AccountCardComponent
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
    AccountsPageComponent,
    AccountListComponent,
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

    AddProductDialogComponent,

    AccountListComponent,
    AccountCardComponent,
    AddAccountDialogComponent,
    EditAccountDialogComponent,
    AddTransactionPageComponent,
    SelectCategoryComponent,
    AddTransactionComponent,
    AccountSettingsComponent,
    TariffComponent,
    CashbackCategoryComponent,
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

    AddAccountDialogComponent,
    EditAccountDialogComponent,

    AddProductDialogComponent
  ]
})
export class BanksModule {
}
