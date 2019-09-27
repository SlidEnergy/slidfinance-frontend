import { Component, OnInit } from '@angular/core';
import { BanksService, Bank } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import {map, catchError, filter, startWith} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-banks-page',
  templateUrl: './banks-page.component.html',
  styleUrls: ['./banks-page.component.scss']
})
export class BanksPageComponent implements OnInit {
  banks: Observable<Bank[]>;
  isBankSelected: Observable<boolean>;

  constructor(
    private router: Router,
    private banksService: BanksService,
    private snackBar: MatSnackBar
  ) {
    this.isBankSelected = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      startWith({url: this.router.url}),
      map(event => event.url != '/banks')
    );
  }

  ngOnInit() {
    this.banks = this.banksService.getList();
  }

  addItem = (item: Bank) => {
    return this.banksService.add(item).pipe(
      map((result) => {
        this.snackBar.open('Банк привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: Bank) => {
    return this.banksService._delete(item.id).pipe(
      map((result) => {
        this.snackBar.open('Банк отвязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось отвязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: Bank) => {
    return this.banksService.update(item.id, item).pipe(
      map((result) => {
        this.snackBar.open('Банк переименован', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось переименовать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
