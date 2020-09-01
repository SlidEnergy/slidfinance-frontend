import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountsService } from './api/accounts.service';
import { AnalysisService } from './api/analysis.service';
import { ApiKeysService } from './api/apiKeys.service';
import { BanksService } from './api/banks.service';
import { CashbackCategoriesService } from './api/cashbackCategories.service';
import { CashbackCategoryMccService } from './api/cashbackCategoryMcc.service';
import { CategoriesService } from './api/categories.service';
import { ImportService } from './api/import.service';
import { MccService } from './api/mcc.service';
import { MerchantsService } from './api/merchants.service';
import { ProductsService } from './api/products.service';
import { RulesService } from './api/rules.service';
import { SaltedgeService } from './api/saltedge.service';
import { SaltedgeAccountInformationService } from './api/saltedgeAccountInformation.service';
import { SaltedgePaymentInitiationService } from './api/saltedgePaymentInitiation.service';
import { TariffsService } from './api/tariffs.service';
import { TelegramService } from './api/telegram.service';
import { TokenService } from './api/token.service';
import { TransactionsService } from './api/transactions.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountsService,
    AnalysisService,
    ApiKeysService,
    BanksService,
    CashbackCategoriesService,
    CashbackCategoryMccService,
    CategoriesService,
    ImportService,
    MccService,
    MerchantsService,
    ProductsService,
    RulesService,
    SaltedgeService,
    SaltedgeAccountInformationService,
    SaltedgePaymentInitiationService,
    TariffsService,
    TelegramService,
    TokenService,
    TransactionsService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
