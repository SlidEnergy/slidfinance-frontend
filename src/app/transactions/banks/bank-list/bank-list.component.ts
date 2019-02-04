import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Bank } from 'src/app/api';
import { MatTableDataSource, MatSnackBar, MatDialog, MatSort } from '@angular/material';
import { AddBankDialogComponent } from '../dialogs/add-bank-dialog/add-bank-dialog.component';
import { EditBankDialogComponent } from '../dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { DeleteBankDialogComponent } from '../dialogs/delete-bank-dialog/delete-bank-dialog.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

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

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  addNew() {
    const dialogRef = this.dialog.open(AddBankDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  startEdit(i: number, bank: Bank) {
    // this.id = id;
    // // index row is used just for debugging proposes and can be removed
    // this.index = i;
    // console.log(this.index);
    const dialogRef = this.dialog.open(EditBankDialogComponent, {
      data: bank
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  deleteItem(i: number, bank: Bank) {
    // this.index = i;
    // this.id = id;
    const dialogRef = this.dialog.open(DeleteBankDialogComponent, {
      data: bank
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }
}
