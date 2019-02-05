import { Component, OnInit } from '@angular/core';
import { BanksService, Bank } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-banks-page',
  templateUrl: './banks-page.component.html',
  styleUrls: ['./banks-page.component.scss']
})
export class BanksPageComponent implements OnInit {
  banks: Observable<Bank[]>;

  constructor(
    private banksService: BanksService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.banks = this.banksService.getBanks();
  }

  addItem = (item: Bank): Observable<boolean> => {
    return this.banksService.addBank(item).pipe(
      map(() => {
        this.snackBar.open('Банк привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: Bank): Observable<boolean> => {
    return this.banksService.deleteBank(item.id).pipe(
      map(() => {
        this.snackBar.open('Банк отвязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось отвязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: Bank) => {
    return this.banksService.editBank(item.id, item).pipe(
      map(() => {
        this.snackBar.open('Банк переименован', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось переименовать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
