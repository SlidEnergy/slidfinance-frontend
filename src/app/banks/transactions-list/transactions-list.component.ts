import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, TransactionsService, AccountsService, BankAccount } from 'src/app/api';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
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
  @Input('columns') columnsToDisplay = ['account', 'dateTime', 'mcc', 'bankCategory', 'description', 'income', 'outcome', 'category'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, BankAccount])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
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

  getAccountTitle(accountId: string) {
    if (!this.accounts)
      return '';

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoryTitle(categoryId: string) {
    if (!this.categories)
      return '';

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }
}
