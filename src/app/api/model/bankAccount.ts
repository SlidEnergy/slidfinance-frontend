

export interface BankAccount {
    id?: string;
    code?: string;
    balance?: number;
    title?: string;
    bankId?: string;
    transactionIds?: Array<string>;
}
