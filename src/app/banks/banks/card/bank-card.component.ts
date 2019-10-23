import { Component, OnInit } from '@angular/core';
import { AccountsService, BankAccount } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {map, catchError, filter, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit {
  accounts: Observable<BankAccount[]>;

  constructor(
    private accountService: AccountsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.accounts = this.route.params.pipe(
      map(params => +params['id']),
      filter(x=>Boolean(x)),
      switchMap(id => this.accountService.getList((id)))
    );
  }

  addItem = (item: BankAccount) => {
    return this.accountService.add({ bankId: item.balance, ...item }).pipe(
      map((result) => {
        this.snackBar.open('Счет привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать счет', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: BankAccount) => {
    return this.accountService._delete(item.id).pipe(
      map(() => {
        this.snackBar.open('Счет отвязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось отвязать счет', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: BankAccount) => {
    return this.accountService.update(item.id, item).pipe(
      map((result) => {
        this.snackBar.open('Счет изменен', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось изменить счет', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
