import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { UsersPageComponent } from './users/users-page.component';
import { UserListComponent } from './users/user-list.component';
import {BanksPageComponent} from './banks/banks-page.component';
import {BankListComponent} from './banks/bank-list.component';
import {AddBankDialogComponent} from './banks/dialogs/add-bank-dialog.component';
import {EditBankDialogComponent} from './banks/dialogs/edit-bank-dialog.component';
import {ProductsPageComponent} from './products/products-page.component';
import {ProductListComponent} from './products/product-list.component';
import {AddProductDialogComponent} from './products/dialogs/add-product-dialog.component';
import {EditProductDialogComponent} from './products/dialogs/edit-product-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'banks', component: BanksPageComponent },
  { path: 'products', component: ProductsPageComponent },
];

@NgModule({
  declarations: [
    UsersPageComponent,
    UserListComponent,
    BanksPageComponent,
    BankListComponent,
    ProductsPageComponent,
    ProductListComponent,

    AddBankDialogComponent,
    EditBankDialogComponent,
    AddProductDialogComponent,
    EditProductDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    AddBankDialogComponent,
    EditBankDialogComponent,
    AddProductDialogComponent,
    EditProductDialogComponent
  ]
})
export class AdminModule { }
