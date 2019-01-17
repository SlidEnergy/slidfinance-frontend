import { TransactionBindingModel } from './transactionBindingModel';


export interface PatchAccountDataBindingModel {
    balance?: number;
    transactions?: Array<TransactionBindingModel>;
}
