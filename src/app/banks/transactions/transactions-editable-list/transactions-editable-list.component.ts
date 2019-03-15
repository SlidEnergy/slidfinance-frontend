import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map, filter, flatMap } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, TransactionsService, AccountsService, BankAccount } from 'src/app/api';
import { MatSnackBar, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-transactions-editable-list',
  templateUrl: './transactions-editable-list.component.html',
  styleUrls: ['./transactions-editable-list.component.scss']
})
export class TransactionsEditableListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input() itemDeleting: (item: Transaction) => Observable<boolean>;
  @Input() itemApproving: (item: Transaction) => Observable<Transaction>;

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
  columnsToDisplay = ['account', 'dateTime', 'mcc', 'bankCategory', 'description', 'income', 'outcome', 'category', 'actions'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private accountsService: AccountsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
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
    this.transactionsService.patchTransaction(transaction.id, [{ 'op': 'replace', 'path': '/categoryId', 'value': transaction.categoryId }])
      .subscribe(() => {
        this.snackBar.open('Категория изменена', undefined, { duration: 5000, panelClass: ['background-green'] });
      }, () => {
        this.snackBar.open('Не удалось изменить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
      });
  }

  getAccountTitle(accountId: number) {
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

  approve(item: Transaction) {
    this.itemApproving(item).pipe(filter(x => !!x))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
      });
  }

  deleteItem(item: Transaction) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { caption: 'Вы уверены что хотите удалить транзакцию?', text: item.description }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(() => this.itemDeleting(item).pipe(filter(x => x))))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
      });
  }
}
