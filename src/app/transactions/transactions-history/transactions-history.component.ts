import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, TransactionsService, AccountsService, Account } from 'src/app/api';
import { MatTable, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Transaction>();

  @Input('transactions') set transactionsInput(value: Transaction[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }
  // ссылка на таблицу, для обновления
  @ViewChild(MatTable) table: MatTable<any>;
  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'dateTime', 'category', 'mcc', 'bankCategory', 'description', 'amount'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private accountsService: AccountsService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategory().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getAccounts().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Account])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category': {
          if (!item.categoryId)
            return '';

            let category = this.categories.get(item.categoryId);
            return category ? category.title : '';
        }
        case 'account': {
          if (!item.accountId)
            return '';

            let account = this.accounts.get(item.accountId);
            return account ? account.title : '';
        }

        default: return item[property];
      }
    };
  }

  category_Changed(e: any, transaction: Transaction) {
    this.transactionsService.patchTransaction(transaction.id, { categoryId: transaction.categoryId })
      .subscribe(() => {
        this.snackBar.open('Категория изменена', undefined, { duration: 5000, panelClass: ['background-green'] });
      }, () => {
        this.snackBar.open('Не удалось изменить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
      })
  }

  getAccountTitle(accountId: string) {
    return this.accounts.get(accountId).title;
  }
}
