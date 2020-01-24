import {Injectable} from '@angular/core';
import {
    EntityCollectionServiceElementsFactory, EntityDataService,
    EntityServicesBase, EntityServicesElements
} from '@ngrx/data';

import {LazyEntityCollectionService} from './lazy-entity-collection-service';
import {LazyLoaderFactoryService} from './lazy-loader-factory.service';
import {CustomEntityDataService} from './custom-entity-data.service';
import {ACCOUNT_ENTITY_NAME, BANK_ENTITY_NAME, CATEGORY_ENTITY_NAME, MCC_ENTITY_NAME, PRODUCT_ENTITY_NAME} from './consts';
import {
    AccountsService,
    Bank,
    BankAccount,
    BanksService,
    CategoriesService,
    Category,
    Mcc,
    MccService,
    Product,
    ProductsService
} from '../../../api';

@Injectable({
    providedIn: 'root'
})
export class AppEntityServicesService extends EntityServicesBase {
    public readonly mcc = new LazyEntityCollectionService<Mcc>(MCC_ENTITY_NAME, this.elementsFactory, this.lazyLoaderFactory);
    public readonly banks = new LazyEntityCollectionService<Bank>(BANK_ENTITY_NAME, this.elementsFactory, this.lazyLoaderFactory);
    public readonly products = new LazyEntityCollectionService<Product>(PRODUCT_ENTITY_NAME, this.elementsFactory, this.lazyLoaderFactory);
    public readonly accounts = new LazyEntityCollectionService<BankAccount>(ACCOUNT_ENTITY_NAME, this.elementsFactory, this.lazyLoaderFactory);
    public readonly categories = new LazyEntityCollectionService<Category>(CATEGORY_ENTITY_NAME, this.elementsFactory, this.lazyLoaderFactory);

    constructor(entityServicesElements: EntityServicesElements,
                private elementsFactory: EntityCollectionServiceElementsFactory,
                private lazyLoaderFactory: LazyLoaderFactoryService,
                entityDataService: EntityDataService,
                mccApi: MccService,
                banksApi: BanksService,
                productsApi: ProductsService,
                accountsApi: AccountsService,
                categoriesApi: CategoriesService,
    ) {
        super(entityServicesElements);

        entityDataService.registerService(MCC_ENTITY_NAME, new CustomEntityDataService<Mcc>({getAll: () => mccApi.getList()}));
        entityDataService.registerService(BANK_ENTITY_NAME, new CustomEntityDataService<Bank>({getAll: () => banksApi.getList()}));
        entityDataService.registerService(PRODUCT_ENTITY_NAME, new CustomEntityDataService<Product>({getAll: () => productsApi.getList()}));
        entityDataService.registerService(ACCOUNT_ENTITY_NAME, new CustomEntityDataService<BankAccount>({getAll: () => accountsApi.getList()}));
        entityDataService.registerService(CATEGORY_ENTITY_NAME, new CustomEntityDataService<Category>({getAll: () => accountsApi.getList()}));

        this.registerEntityCollectionServices([
            this.mcc,
            this.banks,
            this.products,
            this.accounts,
            this.categories
        ]);
    }
}
