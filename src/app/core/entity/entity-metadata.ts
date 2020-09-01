import {EntityMetadataMap} from '@ngrx/data';
import {Type} from '@angular/core';
import {Mcc, SaltedgeBankAccounts} from '../../api';
import {Product} from '../../api';
import {Category} from '../../api';
import {Bank} from '../../api';
import {BankAccount} from '../../api';
import {onlyUnique} from '../../shared/utils/array-utils';

export type EntityDescriptor = {
    name: string;
    pluralName?: string;
    model: Type<any>;
};

export const entities: EntityDescriptor[] = [
    {
        name: "mcc",
        model: Mcc,
        pluralName: "mcc"
    },
    {
        name: "bank",
        model: Bank,
    },
    {
        name: "product",
        model: Product,
    },
    {
        name: "account",
        model: BankAccount,
    },
    {
        name: "category",
        model: Category,
        pluralName: "categories"
    },
    {
        name: "saltedgeBankAccounts",
        model: SaltedgeBankAccounts,
        pluralName: "saltedgeBankAccounts"
    }
];

(function checkUnique() {
    if (entities.length != entities.map(x => x.model).filter(onlyUnique).length) {
        console.error("Список описателей сущностей содержит дубликаты: ");
        for (const descriptor of entities) {
            console.log(descriptor.model);
        }

        throw new Error("Список описателей сущностей содержит дубликаты");
    }
})();

export function getEntityDescriptorByModel(model: Type<any>) {
    // При проверки model.name возможны ситуации, когда разные модели после минификации кода будут иметь одинаковые имена.
    return entities.find(c => c.model === model);
}

export function createEntityConfig() {
    const entityMetadata: EntityMetadataMap = {};
    const pluralNames = {};

    entities.forEach(e => {
        entityMetadata[e.name] = {};
        if (e.pluralName) {
            pluralNames[e.name] = e.pluralName;
        }
    });

    return {
        entityMetadata,
        pluralNames,
    };
}
