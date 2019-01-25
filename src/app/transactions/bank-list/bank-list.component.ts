import { Component, OnInit, Input } from '@angular/core';
import { Bank } from 'src/app/api';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Bank>();

  @Input('banks') set transactionsInput(value: Bank[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'balance'];
  loadingVisible = true;

  constructor() { }

  ngOnInit() {
  }

}
