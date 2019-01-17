import { Bank } from './bank';


export interface User {
    id?: number;
    email: string;
    password: string;
    banks: Array<Bank>;
}
