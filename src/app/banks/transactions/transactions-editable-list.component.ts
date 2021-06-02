import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StorageMap} from "@ngx-pwa/local-storage";
import {Observable} from 'rxjs';

import {catchError, filter, flatMap, map} from 'rxjs/operators';

import {AccountsService, BankAccount, CategoriesService, Category, Transaction, TransactionsService} from 'src/app/api';
import {MessageDialogComponent} from 'src/app/shared/message-dialog/message-dialog.component';

@Component({
    selector: 'app-transactions-editable-list',
    templateUrl: './transactions-editable-list.component.html',
    styleUrls: ['./transactions-editable-list.component.scss']
})
export class TransactionsEditableListComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    @Input() itemDeleting: (item: Transaction) => Observable<boolean>;
    @Input() itemApproving: (item: Transaction) => Observable<Transaction>;
    @Input() itemCategoryChanging: (item: Transaction) => Observable<Transaction>;

    categories: Map<number, Category>;
    accounts: Map<number, BankAccount>;

    // список транзакций пользователя
    dataSource = new MatTableDataSource<Transaction>();

    @Input('transactions') set transactionsInput(value: Transaction[]) {
        if (value) {
            this.loadingVisible = false;
            this.dataSource.data = value;
        }
    }

    // Список колонок, которые нужно показать в таблице
    columnsToDisplay = ['account', 'dateTime', 'mcc', 'bankCategory', 'description', 'amount', 'userDescription', 'category', 'actions'];
    loadingVisible = true;
    recentCategories: number[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private transactionsService: TransactionsService,
        private snackBar: MatSnackBar,
        private accountsService: AccountsService,
        private dialog: MatDialog,
        private storage: StorageMap
    ) {
    }

    ngOnInit() {
        this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
        this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
        this.dataSource.filterPredicate = this.filterPredicate.bind(this);
        this.dataSource.paginator = this.paginator;

        this.storage.get("recentCategories", {type: "array", items: {type: "number"}})
            .pipe(catchError(x => []))
            .subscribe(x => this.recentCategories = x);
    }

    sortingDataAccessor(transaction, property) {
        switch (property) {
            case 'category': {
                if (!transaction.categoryId) {
                    return '';
                }

                let category = this.categories.get(transaction.categoryId);
                return category ? category.title : '';
            }
            case 'account': {
                if (!transaction.accountId) {
                    return '';
                }

                let account = this.accounts.get(transaction.accountId);
                return account ? account.title : '';
            }

            default:
                return transaction[property];
        }
    }

    filterPredicate(transaction, filter) {
        if (!filter) {
            return true;
        }


        if (!filter || JSON.stringify(transaction).toLowerCase().indexOf(filter) >= 0) {
            return true;
        }

        let data = '';

        let account = this.accounts.get(transaction.accountId);
        data += account ? account.title : '';
        let category = this.categories.get(transaction.categoryId);
        data += category ? category.title : '';

        if (data.toLowerCase().indexOf(filter) >= 0) {
            return true;
        }

        return false;
    }

    category_Changed(transaction: Transaction) {
        this.itemCategoryChanging(transaction).pipe(filter(x => !!x))
            .subscribe((result) => {
                this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
            });
        this.memorizeRecentCategory(transaction);
    }

    private memorizeRecentCategory(transaction: Transaction) {
        this.storage.get("recentCategories", {type: "array", items: {type: "number"}}).pipe(catchError(err => []))
            .subscribe(recent => {
                recent = recent.filter(x => x == transaction.categoryId);
                recent.unshift(transaction.categoryId);

                recent = recent.slice(0, 3);

                localStorage.setItem("recentCategories", JSON.stringify(recent));
            });
    }

    getAccountTitle(accountId: number) {
        if (!this.accounts) {
            return '';
        }

        let account = this.accounts.get(accountId);
        return account ? account.title : '';
    }

    getCategoriesArray() {
        if (!this.categories)
            return;

        const categories = Array.from(this.categories.values());

        categories.unshift(...this.recentCategories.map(x => this.categories.get(x)));

        return categories;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    save(item: Transaction) {
        this.transactionsService.patch(item.id, [{
            op: 'replace',
            path: '/userDescription',
            value: item.userDescription,
            from: null
        }])
            .subscribe(result => {
                this.snackBar.open('Описание сохранено', undefined, {duration: 5000, panelClass: ['background-green']});
                this.dataSource.data = this.dataSource.data.map(value => value.id == result.id ? result : value);
            }, error => this.snackBar.open('Не удалось сохранить описание', undefined, {
                duration: 5000,
                panelClass: ['background-red']
            }));
    }

    approve(item: Transaction) {
        this.itemApproving(item).pipe(filter(x => !!x))
            .subscribe((result) => {
                this.dataSource.data = this.dataSource.data.map(value => value.id == result.id ? result : value);
            });
    }

    deleteItem(item: Transaction) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {caption: 'Вы уверены что хотите удалить транзакцию?', text: item.description}
        });

        dialogRef.afterClosed().pipe(filter(x => x), flatMap(() => this.itemDeleting(item).pipe(filter(x => x))))
            .subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(value => value.id != item.id);
            });
    }
}
