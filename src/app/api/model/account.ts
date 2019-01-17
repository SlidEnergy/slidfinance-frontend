import { Bank } from './bank';
import { Transaction } from './transaction';


export interface Account {
    id?: number;
    balance?: number;
    title: string;
    bank: Bank;
    transactions: Array<Transaction>;
}
