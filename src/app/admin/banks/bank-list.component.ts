import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Bank } from 'src/app/api';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddBankDialogComponent } from './dialogs/add-bank-dialog.component';
import { EditBankDialogComponent } from './dialogs/edit-bank-dialog.component';
import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() itemAdding: (item: Bank) => Observable<any>;
  @Input() itemDeleting: (item: Bank) => Observable<boolean>;
  @Input() itemChanging: (item: Bank) => Observable<Bank>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Bank>();

  @Input('banks') set transactionsInput(value: Bank[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'actions'];
  loadingVisible = true;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

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

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemAdding(result).pipe(filter(x => x))))
      .subscribe((result) => {
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      });
  }

  editItem(bank: Bank) {
    const dialogRef = this.dialog.open(EditBankDialogComponent, {
      data: { ...bank }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemChanging(result).pipe(filter(x => !!x))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
      });
  }

  deleteItem(item: Bank) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { caption: 'Вы уверены что хотите отвязать банк?', text: item.title }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(() => this.itemDeleting(item).pipe(filter(x => x))))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
      });
  }
}
