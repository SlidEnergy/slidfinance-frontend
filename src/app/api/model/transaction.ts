import { Account } from './account';
import { Category } from './category';


export interface Transaction {
    id?: number;
    dateTime?: Date;
    amount?: number;
    category?: Category;
    description: string;
    account: Account;
}
