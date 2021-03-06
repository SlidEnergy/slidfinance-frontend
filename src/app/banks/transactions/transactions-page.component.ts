import {Component, OnInit} from '@angular/core';
import {Transaction, TransactionsService} from 'src/app/api';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-transactions-page',
    templateUrl: './transactions-page.component.html',
    styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {
    transactions: Observable<Transaction[]>;

    constructor(
        private transactionsService: TransactionsService,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.update();
    }

    update() {
        this.transactions = this.transactionsService.getList();
    }

    deleteItem = (item: Transaction) => {
        return this.transactionsService._delete(item.id).pipe(
            map(() => {
                this.snackBar.open('Транзакция удалена', undefined, {duration: 5000, panelClass: ['background-green']});
                return true;
            }),
            catchError(() => {
                this.snackBar.open('Не удалось удалить транзакцию', undefined, {duration: 5000, panelClass: ['background-red']});
                return of(false);
            }));
    };

    approveItem = (item: Transaction) => {
        return this.transactionsService.patch(item.id, [{op: 'replace', path: '/approved', value: true, from: null}]).pipe(
            map((result) => {
                this.snackBar.open('Транзакция подтверждена', undefined, {duration: 5000, panelClass: ['background-green']});
                return result;
            }),
            catchError(() => {
                this.snackBar.open('Не удалось подтвердить транзакцию', undefined, {duration: 5000, panelClass: ['background-red']});
                return of(false);
            }));
    };

    changeCategory = (item: Transaction) => {
        return this.transactionsService.patch(item.id, [
            {op: 'replace', path: '/categoryId', value: item.categoryId, from: null},
            {op: 'replace', path: '/approved', value: true, from: null}]).pipe(
            map((result: Transaction) => {
                this.snackBar.open('Категория изменена', undefined, {duration: 5000, panelClass: ['background-green']});
                return result;
            }),
            catchError(() => {
                this.snackBar.open('Не удалось изменить категорию', undefined, {duration: 5000, panelClass: ['background-red']});
                return of(false);
            }));
    };
}
