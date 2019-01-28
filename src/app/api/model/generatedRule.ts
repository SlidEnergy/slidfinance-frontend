import { CategoryDistribution } from './categoryDistribution';


export interface GeneratedRule {
    accountId?: string;
    description?: string;
    mcc?: number;
    bankCategory?: string;
    categories?: Array<CategoryDistribution>;
    count?: number;
}
