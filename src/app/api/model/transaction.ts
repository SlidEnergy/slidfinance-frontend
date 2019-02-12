

export interface Transaction {
    id?: string;
    accountId?: string;
    dateTime?: Date;
    amount?: number;
    categoryId?: string;
    description?: string;
    mcc?: number;
    bankCategory?: string;
    approved?: boolean;
}
