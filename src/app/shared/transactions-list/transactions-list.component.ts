import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, TransactionsService, AccountsService, BankAccount } from 'src/app/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Transaction>();

  @Input('transactions') set transactionsInput(value: Transaction[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  @Input('columns') columnsToDisplay = ['account', 'dateTime', 'mcc', 'bankCategory', 'description', 'amount', 'userDescription'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
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

  getAccountTitle(accountId: number) {
    if (!this.accounts)
      return '';

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoryTitle(categoryId: number) {
    if (!this.categories)
      return '';

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }
}
