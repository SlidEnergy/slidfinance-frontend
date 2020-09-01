import {Injectable, Type} from '@angular/core';
import {EntityCollectionServiceElementsFactory, EntityDataService, EntityServicesBase, EntityServicesElements} from '@ngrx/data';

import {LazyEntityCollectionService} from './lazy-entity-collection-service';
import {LazyLoaderFactoryService} from './lazy-loader-factory.service';
import {CustomEntityDataService} from './custom-entity-data.service';
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
    ProductsService,
    SaltedgeBankAccounts,
    SaltedgeService
} from '../../api';
import {getEntityDescriptorByModel} from './entity-metadata';
import {CustomEntityDataServiceOptions} from './custom-entity-data-service-options';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EntityDataContextService extends EntityServicesBase {
    public readonly mcc = this.createAndRegisterCollectionService(Mcc);
    public readonly banks = this.createAndRegisterCollectionService(Bank);
    public readonly products = this.createAndRegisterCollectionService(Product);
    public readonly accounts = this.createAndRegisterCollectionService(BankAccount);
    public readonly categories = this.createAndRegisterCollectionService(Category);

    constructor(entityServicesElements: EntityServicesElements,
                private elementsFactory: EntityCollectionServiceElementsFactory,
                private lazyLoaderFactory: LazyLoaderFactoryService,
                private entityDataService: EntityDataService,
                mccApi: MccService,
                banksApi: BanksService,
                productsApi: ProductsService,
                accountsApi: AccountsService,
                categoriesApi: CategoriesService,
    ) {
        super(entityServicesElements);

        this.createAndRegisterDataService(Mcc, {getAll: () => mccApi.getList()});
        this.createAndRegisterDataService(Bank, {getAll: () => banksApi.getList()});
        this.createAndRegisterDataService(Product, {getAll: () => productsApi.getList()});

        this.createAndRegisterDataService(BankAccount, {
            getAll: () => accountsApi.getList(),
            upsert: (entity) => accountsApi.update(entity.id, entity)
        });

        this.createAndRegisterDataService(Category, {getAll: () => categoriesApi.getList()});
    }

    private createAndRegisterCollectionService<T>(model: Type<T>) {
        const descriptor = getEntityDescriptorByModel(model);

        if (!descriptor) {
            throw new Error('Не найден описатель сущности для класса: ' + model);
        }

        // Регистрируем entityCollectionService
        const collectionService = new LazyEntityCollectionService<T>(
            descriptor.name,
            this.elementsFactory,
            this.lazyLoaderFactory
        );
        this.registerEntityCollectionService<T>(collectionService);

        return collectionService;
    }

    private createAndRegisterDataService<T>(model: Type<T>, options: CustomEntityDataServiceOptions<T>) {
        const descriptor = getEntityDescriptorByModel(model);

        if (!descriptor) {
            throw new Error('Не найден описатель сущности для класса: ' + model);
        }

        // Регистрируем entityDataService
        const entityDataService = new CustomEntityDataService<T>(descriptor.name, options);
        this.entityDataService.registerService(descriptor.name, entityDataService);

        return entityDataService;
    }

    clearAllCache() {
        for (const key in this) {
            if (!this.hasOwnProperty(key)) {
                return;
            }

            const property = this[key];

            if (property instanceof LazyEntityCollectionService) {
                property.clearCache();
            }
        }
    }
}
