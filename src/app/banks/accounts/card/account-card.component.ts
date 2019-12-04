import {Component, OnInit} from '@angular/core';
import {BankAccount, Transaction, TransactionsService} from 'src/app/api';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, filter, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  transactions: Observable<Transaction[]>;
  accountId: number;
  transactionColumns = ['account', 'dateTime', 'mcc', 'bankCategory', 'description', 'amount', 'userDescription'];

  constructor(
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.transactions = this.route.params.pipe(
      map(params => +params['id']),
      filter(x => Boolean(x)),
      tap(x => this.accountId = x),
      switchMap(id => this.transactionsService.getList())
    );
  }
}
