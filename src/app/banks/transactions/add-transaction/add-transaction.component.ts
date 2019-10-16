import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TransactionsService } from 'src/app/api';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  dateTime = moment.utc();
  amount = '';
  description = '';

  accountId = +this.route.snapshot.parent.params['accountId'];
  categoryId = +this.route.snapshot.queryParams['categoryId'];

  constructor(
    private transactions: TransactionsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  income() {
    this.add(+this.amount);
  }

  outcome() {
    this.add(-1 * +this.amount);
  }

  add(amount: number) {
    if (amount == 0) {
      this.snackBar.open('Введите сумму', undefined, { duration: 5000, panelClass: ['background-blue'] });
      return;
    }

    this.transactions.add({
      accountId: this.accountId,
      dateTime: this.dateTime.toDate(),
      amount: amount,
      categoryId: this.categoryId,
      description: this.description,
      approved: true
    }).subscribe(
      () => {
        this.snackBar.open('Транзакция добавлена', undefined, { duration: 5000, panelClass: ['background-green'] });
        this.amount = '';
        this.description = '';
        this.dateTime = moment.utc();
      },
      () => {
        this.snackBar.open('Не удалось добавить транзакцию', undefined, { duration: 5000, panelClass: ['background-red'] });
      });
  }
}
