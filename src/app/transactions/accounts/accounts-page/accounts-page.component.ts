import { Component, OnInit } from '@angular/core';
import { AccountsService, BankAccount } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {
  accounts: Observable<BankAccount[]>;

  constructor(
    private accountService: AccountsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let bankId = this.route.snapshot.params['id'];

    this.accounts = this.accountService.getList(bankId);
  }

  addItem = (item: BankAccount): Observable<boolean> => {
    return this.accountService.add(item).pipe(
      map(() => {
        this.snackBar.open('Счет привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать счет', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: BankAccount): Observable<boolean> => {
    return this.accountService.delete(item.id).pipe(
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
      map(() => {
        this.snackBar.open('Счет изменен', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось изменить счет', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
