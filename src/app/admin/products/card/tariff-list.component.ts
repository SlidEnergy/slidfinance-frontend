import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Product, ProductTariff, ProductType, TariffsService} from 'src/app/api';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {filter, switchMap, switchMapTo} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageDialogComponent} from 'src/app/shared/message-dialog/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EditTariffDialogComponent} from './dialogs/edit-tariff-dialog.component';
import {AddTariffDialogComponent} from './dialogs/add-tariff-dialog.component';

@Component({
    selector: 'app-tariff-list',
    templateUrl: './tariff-list.component.html',
    styleUrls: ['./tariff-list.component.scss']
})
export class TariffListComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // список транзакций пользователя
    dataSource = new MatTableDataSource<ProductTariff>();

    @Input('entities') set transactionsInput(value: ProductTariff[]) {
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
        private tariffsService: TariffsService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    }

    sortingDataAccessor(item: ProductTariff, property: string) {
        switch (property) {
            case 'title': {
                return item.title.toLowerCase();
            }

            default:
                return item[property];
        }
    }

    addNew() {
        const dialogRef = this.dialog.open(AddTariffDialogComponent, {
            data: {type: ProductType.Card, productId: this.cardEntityId}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.tariffsService.add(item))
        ).subscribe(
            value => {
                let data = this.dataSource.data;
                data.push(value);
                this.dataSource.data = data;
                this.snackBar.open('Продукт привязан', undefined, {duration: 5000, panelClass: ['background-green']});
            },
            error => this.snackBar.open('Не удалось привязать продукт', undefined, {
                duration: 5000,
                panelClass: ['background-red']
            })
        );
    }

    editItem(bank: ProductTariff) {
        const dialogRef = this.dialog.open(EditTariffDialogComponent, {
            data: {...bank}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.tariffsService.update(item.id, item))
        ).subscribe(
            value => {
                this.dataSource.data = this.dataSource.data.map(x => x.id == value.id ? value : x);
                this.snackBar.open('Продукт переименован', undefined, {
                    duration: 5000,
                    panelClass: ['background-green']
                });
            },
            error => this.snackBar.open('Не удалось переименовать продукт', undefined, {
                duration: 5000,
                panelClass: ['background-red']
            })
        );
    }

    deleteItem(item: ProductTariff) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {caption: 'Вы уверены что хотите отвязать банк?', text: item.title}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMapTo(this.tariffsService._delete(item.id))
        ).subscribe(
            value => {
                this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
                this.snackBar.open('Продукт отвязан', undefined, {duration: 5000, panelClass: ['background-green']});
            },
            error => this.snackBar.open('Не удалось отвязать продукт', undefined, {
                duration: 5000,
                panelClass: ['background-red']
            })
        );
    }

    row_click(row: Product) {
        this.router.navigate(['admin/tariffs', row.id]);
    }
}
