import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { Routes, RouterModule } from '@angular/router';
import { BanksPageComponent } from './banks/banks-page/banks-page.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { GeneratedRuleListComponent } from './generated-rule-list/generated-rule-list.component';
import { AddRuleDialogComponent } from './dialogs/add-rule/add-rule-dialog.component';
import { DeleteRuleDialogComponent } from './dialogs/delete-rule-dialog/delete-rule-dialog.component';
import { EditRuleDialogComponent } from './dialogs/edit-rule-dialog/edit-rule-dialog.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DeleteCategoryDialogComponent } from './dialogs/delete-category-dialog/delete-category-dialog.component';
import { AddCategoryDialogComponent } from './dialogs/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddBankDialogComponent } from './banks/dialogs/add-bank-dialog/add-bank-dialog.component';
import { EditBankDialogComponent } from './banks/dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { DeleteBankDialogComponent } from './banks/dialogs/delete-bank-dialog/delete-bank-dialog.component';

const routes: Routes = [
  { path: '', component: TransactionsPageComponent },
  { path: 'banks', component: BanksPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'categories', component: CategoriesPageComponent },
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
    AddRuleDialogComponent,
    DeleteRuleDialogComponent,
    EditRuleDialogComponent,
    CategoriesPageComponent,
    CategoryListComponent,
    DeleteCategoryDialogComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    AddBankDialogComponent,
    EditBankDialogComponent,
    DeleteBankDialogComponent
  ],
  imports: [
    CommonModule,
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
    DeleteBankDialogComponent
  ]
})
export class TransactionsModule { }
