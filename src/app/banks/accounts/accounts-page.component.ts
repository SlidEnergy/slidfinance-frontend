import { Component, OnInit } from '@angular/core';
import {AccountsService, BankAccount} from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {map, catchError, filter, startWith} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {
  accounts: Observable<BankAccount[]>;
  isAccountSelected: Observable<boolean>;

  constructor(
    private router: Router,
    private accountService: AccountsService,
    private snackBar: MatSnackBar
  ) {
    this.isAccountSelected = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      startWith({url: this.router.url}),
      map(event => event.url != '/banks')
    );
  }

  ngOnInit() {
    this.accounts = this.accountService.getList();
  }

  addItem = (item: BankAccount) => {
    return this.accountService.add(item).pipe(
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
