export * from './accounts.service';
import { AccountsService } from './accounts.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './banks.service';
import { BanksService } from './banks.service';
export * from './transactions.service';
import { TransactionsService } from './transactions.service';
export const APIS = [AccountsService, AuthService, BanksService, TransactionsService];
