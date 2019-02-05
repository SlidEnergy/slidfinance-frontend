import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Bank } from 'src/app/api';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { AddBankDialogComponent } from '../dialogs/add-bank-dialog/add-bank-dialog.component';
import { EditBankDialogComponent } from '../dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { DeleteBankDialogComponent } from '../dialogs/delete-bank-dialog/delete-bank-dialog.component';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input() itemAdding: (item: Bank) => Observable<boolean>;
  @Input() itemDeleting: (item: Bank) => Observable<boolean>;
  @Input() itemChanging: (item: Bank) => Observable<boolean>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Bank>();

  @Input('banks') set transactionsInput(value: Bank[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'balance', 'actions'];
  loadingVisible = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
  }

  sortingDataAccessor(bank: Bank, property: string) {
    switch (property) {
      case 'title': {
        return bank.title.toLowerCase();
      }

      default: return bank[property];
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddBankDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemAdding(result).pipe(filter(x => x), map(x => result))))
      .subscribe((result) => {
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      });
  }

  editItem(bank: Bank) {
    const dialogRef = this.dialog.open(EditBankDialogComponent, {
      data: bank
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemChanging(result).pipe(filter(x => x), map(x => result))))
      .subscribe((result) => {
        this.dataSource.data.map((value) => value.id == result.data.id ? result.data : value);
      });
  }

  deleteItem(bank: Bank) {
    const dialogRef = this.dialog.open(DeleteBankDialogComponent, {
      data: bank
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemDeleting(result).pipe(filter(x => x), map(x => result))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != result.id);
      });
  }
}
