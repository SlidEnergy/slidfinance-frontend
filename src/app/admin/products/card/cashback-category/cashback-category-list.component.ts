import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CashbackCategoriesService, CashbackCategory} from '../../../../api';
import {Router} from '@angular/router';
import {filter, switchMap, switchMapTo} from 'rxjs/operators';
import {MessageDialogComponent} from '../../../../shared/message-dialog/message-dialog.component';
import {AddCashbackCategoryDialogComponent} from './dialogs/add-cashback-category-dialog.component';
import {EditCashbackCategoryDialogComponent} from './dialogs/edit-cashback-category-dialog.component';

@Component({
  selector: 'app-cashback-category-list',
  templateUrl: './cashback-category-list.component.html',
  styleUrls: ['./cashback-category-list.component.scss']
})
export class CashbackCategoryListComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // список транзакций пользователя
    dataSource = new MatTableDataSource<CashbackCategory>();

    @Input('entities') set entitiesInput(value: CashbackCategory[]) {
        if (value) {
            this.loadingVisible = false;
            this.dataSource.data = value;
        }
    }

    @Input() cardEntityId: number;

    // Список колонок, которые нужно показать в таблице
    columnsToDisplay = ['title', 'actions'];
    loadingVisible = true;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private service: CashbackCategoriesService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    }

    sortingDataAccessor(item: CashbackCategory, property: string) {
        switch (property) {
            case 'title': {
                return item.title.toLowerCase();
            }

            default:
                return item[property];
        }
    }

    addNew() {
        const dialogRef = this.dialog.open(AddCashbackCategoryDialogComponent, {
            data: { tariffId: this.cardEntityId}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.service.add(item))
        ).subscribe(
            value => {
                let data = this.dataSource.data;
                data.push(value);
                this.dataSource.data = data;
                this.snackBar.open('Продукт привязан', undefined, {duration: 5000, panelClass: ['background-green']});
            },
            error => this.snackBar.open('Не удалось привязать продукт', undefined, {duration: 5000, panelClass: ['background-red']})
        );
    }

    editItem(entity: CashbackCategory) {
        const dialogRef = this.dialog.open(EditCashbackCategoryDialogComponent, {
            data: {...entity}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.service.update(item.id, item))
        ).subscribe(
            value => {
                this.dataSource.data = this.dataSource.data.map(x => x.id == value.id ? value : x);
                this.snackBar.open('Продукт переименован', undefined, {duration: 5000, panelClass: ['background-green']});
            },
            error => this.snackBar.open('Не удалось переименовать продукт', undefined, {duration: 5000, panelClass: ['background-red']})
        );
    }
}
