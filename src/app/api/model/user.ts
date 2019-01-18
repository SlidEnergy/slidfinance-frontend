import { Bank } from './bank';
import { Category } from './category';


export interface User {
    id?: number;
    email: string;
    password: string;
    banks: Array<Bank>;
    categories: Array<Category>;
}
