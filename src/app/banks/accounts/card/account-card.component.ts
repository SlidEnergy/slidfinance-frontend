import {Component, OnInit} from '@angular/core';
import {AccountsService, BankAccount, Transaction, TransactionsService} from 'src/app/api';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, filter, switchMap, tap, share, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {EditAccountDialogComponent} from "../dialogs/edit-account-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AppEntityServicesService} from '../../../core/store/entity/app-entity-services.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  transactions: Observable<Transaction[]>;
  transactionColumns = ['dateTime', 'mcc', 'bankCategory', 'description', 'amount', 'userDescription'];

  cardEntityId = this.route.params.pipe(
    map(params => +params['id']),
    filter(x => Boolean(x)),
    share()
  );

  account: Observable<BankAccount>;

  constructor(
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dataContext: AppEntityServicesService,
    private accountsService: AccountsService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.transactions = this.cardEntityId.pipe(
      switchMap(id => this.transactionsService.getList(id))
    );

    this.account = this.cardEntityId.pipe(
      switchMap(id => this.dataContext.accounts.getByIdLazy(id))
    )
  }

  addTransaction(account: BankAccount) {
    this.router.navigate(['banks', account.bankId, 'accounts', account.id, 'transactions', 'new']);
  }

  editItem(account: BankAccount) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: {...account}
    });

    dialogRef.afterClosed().pipe(
      filter(x => x),
      switchMap(item => this.accountsService.update(item.id, item))
    ).subscribe(
      result => {
        this.snackBar.open('Карта изменена', undefined, {duration: 5000, panelClass: ['background-green']});
        return result;
      },
      error => {
        this.snackBar.open('Не удалось изменить карту', undefined, {duration: 5000, panelClass: ['background-red']});
        return of(false);
      });
  }
}
