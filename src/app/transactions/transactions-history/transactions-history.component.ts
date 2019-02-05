import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, TransactionsService, AccountsService, BankAccount } from 'src/app/api';
import { MatTable, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  categories: Map<string, Category>;
  accounts: Map<string, BankAccount>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Transaction>();

  @Input('transactions') set transactionsInput(value: Transaction[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'dateTime', 'category', 'mcc', 'bankCategory', 'description', 'income', 'outcome'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getAccounts().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, BankAccount])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
  }

  sortingDataAccessor(transaction, property) {
    switch (property) {
      case 'category': {
        if (!transaction.categoryId)
          return '';

        let category = this.categories.get(transaction.categoryId);
        return category ? category.title : '';
      }
      case 'account': {
        if (!transaction.accountId)
          return '';

        let account = this.accounts.get(transaction.accountId);
        return account ? account.title : '';
      }

      default: return transaction[property];
    }
  }

  filterPredicate(transaction, filter) {
    if (!filter)
      return true;


    if (!filter || JSON.stringify(transaction).toLowerCase().indexOf(filter) >= 0)
      return true;

    let data = "";

    let account = this.accounts.get(transaction.accountId);
    data += account ? account.title : "";
    let category = this.categories.get(transaction.categoryId);
    data += category ? category.title : "";

    if (data.toLowerCase().indexOf(filter) >= 0)
      return true;

    return false;
  }

  category_Changed(transaction: Transaction) {
    this.transactionsService.patchTransaction(transaction.id, { categoryId: transaction.categoryId })
      .subscribe(() => {
        this.snackBar.open('Категория изменена', undefined, { duration: 5000, panelClass: ['background-green'] });
      }, () => {
        this.snackBar.open('Не удалось изменить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
      });
  }

  getAccountTitle(accountId: string) {
    if (!this.accounts)
      return '';

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoriesArray() {
    return this.categories && Array.from(this.categories.values());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
