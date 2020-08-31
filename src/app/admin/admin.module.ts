import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UsersPageComponent} from './users/users-page.component';
import {UserListComponent} from './users/user-list.component';
import {BanksPageComponent} from './banks/banks-page.component';
import {BankListComponent} from './banks/bank-list.component';
import {AddBankDialogComponent} from './banks/dialogs/add-bank-dialog.component';
import {EditBankDialogComponent} from './banks/dialogs/edit-bank-dialog.component';
import {ProductsPageComponent} from './products/products-page.component';
import {ProductListComponent} from './products/product-list.component';
import {AddProductDialogComponent} from './products/dialogs/add-product-dialog.component';
import {EditProductDialogComponent} from './products/dialogs/edit-product-dialog.component';
import {ProductCardPageComponent} from './products/card/product-card-page.component';
import {TariffListComponent} from './products/card/tariff-list.component';
import {EditTariffDialogComponent} from './products/card/dialogs/edit-tariff-dialog.component';
import {AddTariffDialogComponent} from './products/card/dialogs/add-tariff-dialog.component';
import {TariffCardPage2Component} from "./products/card/tariff-card/tariff-card-page2.component";
import {TariffCashbackCategoryListComponent} from "./products/card/tariff-card/tariff-cashback-category-list.component";
import {TariffAddCashbackCategoryDialogComponent} from "./products/card/tariff-card/dialogs/tariff-add-cashback-category-dialog.component";
import {TariffEditCashbackCategoryDialogComponent} from "./products/card/tariff-card/dialogs/tariff-edit-cashback-category-dialog.component";
import {
    EditableMccListComponent
} from "./products/card/tariff-card/dialogs/editable-mcc-list.component";
import {TariffCardPageComponent} from './products/card/tariff-card-page.component';
import {AddCashbackCategoryDialogComponent} from './products/card/cashback-category/dialogs/add-cashback-category-dialog.component';
import {EditCashbackCategoryDialogComponent} from './products/card/cashback-category/dialogs/edit-cashback-category-dialog.component';
import {CashbackCategoryListComponent} from './products/card/cashback-category/cashback-category-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UsersPageComponent},
    {path: 'banks', component: BanksPageComponent},
    {path: 'products', component: ProductsPageComponent},
    {path: 'products/:id', component: ProductCardPageComponent},
    {path: 'tariffs/:id', component: TariffCardPageComponent},
];

@NgModule({
    declarations: [
        UsersPageComponent,
        UserListComponent,
        BanksPageComponent,
        BankListComponent,
        ProductsPageComponent,
        ProductListComponent,
        ProductCardPageComponent,
        TariffListComponent,
        TariffCardPageComponent,
        TariffCashbackCategoryListComponent,
        EditableMccListComponent,
        TariffCardPageComponent,
        CashbackCategoryListComponent,
        TariffCardPage2Component,

        AddBankDialogComponent,
        EditBankDialogComponent,
        AddProductDialogComponent,
        EditProductDialogComponent,
        AddTariffDialogComponent,
        EditTariffDialogComponent,
        TariffAddCashbackCategoryDialogComponent,
        TariffEditCashbackCategoryDialogComponent,
        AddCashbackCategoryDialogComponent,
        EditCashbackCategoryDialogComponent
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
        EditProductDialogComponent,
        AddTariffDialogComponent,
        EditTariffDialogComponent,
        TariffAddCashbackCategoryDialogComponent,
        TariffEditCashbackCategoryDialogComponent,
        AddCashbackCategoryDialogComponent,
        EditCashbackCategoryDialogComponent
    ]
})
export class AdminModule {
}
