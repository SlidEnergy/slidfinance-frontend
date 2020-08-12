import {EntityMetadataMap} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    mcc: {},
    bank: {},
    product: {},
    account: {},
    category: {},
};

const pluralNames = {
    mcc: "mcc",
    bank: "banks",
    product: "products",
    account: "accounts",
    category: "categories",
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
