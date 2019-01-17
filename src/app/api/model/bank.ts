import { Account } from './account';
import { User } from './user';


export interface Bank {
    id?: number;
    title: string;
    accounts: Array<Account>;
    user: User;
}
