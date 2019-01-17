import { Account } from './account';


export interface Transaction {
    id?: number;
    dateTime?: Date;
    amount?: number;
    category?: Transaction.CategoryEnum;
    description: string;
    account: Account;
}
export namespace Transaction {
    export type CategoryEnum = 0 | 1 | 2 | 3 | 4;
    export const CategoryEnum = {
        NUMBER_0: 0 as CategoryEnum,
        NUMBER_1: 1 as CategoryEnum,
        NUMBER_2: 2 as CategoryEnum,
        NUMBER_3: 3 as CategoryEnum,
        NUMBER_4: 4 as CategoryEnum
    }
}
