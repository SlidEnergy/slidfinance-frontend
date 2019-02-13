import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BankAccount } from 'src/app/api';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { AddAccountDialogComponent } from '../dialogs/add-account-dialog/add-account-dialog.component';
import { EditAccountDialogComponent } from '../dialogs/edit-account-dialog/edit-account-dialog.component';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input() itemAdding: (item: BankAccount) => Observable<any>;
  @Input() itemDeleting: (item: BankAccount) => Observable<boolean>;
  @Input() itemChanging: (item: BankAccount) => Observable<boolean>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<BankAccount>();

  @Input('banks') set transactionsInput(value: BankAccount[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'code', 'balance', 'actions'];
  loadingVisible = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
  }

  sortingDataAccessor(account: BankAccount, property: string) {
    switch (property) {
      case 'title': {
        return account.title.toLowerCase();
      }

      default: return account[property];
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddAccountDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemAdding(result).pipe(filter(x => x))))
      .subscribe((result) => {
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      });
  }

  editItem(account: BankAccount) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: { ...account }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemChanging(result).pipe(filter(x => x), map(x => result))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
      });
  }

  deleteItem(item: BankAccount) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { caption: 'Вы уверены что хотите отвязать счет?', text: item.title }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(() => this.itemDeleting(item).pipe(filter(x => x), map(x => item))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != result.id);
      });
  }
}
