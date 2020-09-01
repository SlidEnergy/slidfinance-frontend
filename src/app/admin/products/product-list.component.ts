import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Bank, Product, ProductsService, ProductType} from 'src/app/api';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EditProductDialogComponent} from './dialogs/edit-product-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageDialogComponent} from 'src/app/shared/message-dialog/message-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AddProductDialogComponent} from './dialogs/add-product-dialog.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    // список транзакций пользователя
    dataSource = new MatTableDataSource<Product>();

    @Input('products') set transactionsInput(value: Product[]) {
        if (value) {
            this.loadingVisible = false;
            this.dataSource.data = value;
        }
    }

    // Список колонок, которые нужно показать в таблице
    columnsToDisplay = ['title', 'actions'];
    loadingVisible = true;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private productsService: ProductsService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    }

    sortingDataAccessor(bank: Bank, property: string) {
        switch (property) {
            case 'title': {
                return bank.title.toLowerCase();
            }

            default:
                return bank[property];
        }
    }

    addNew() {
        const dialogRef = this.dialog.open(AddProductDialogComponent, {
            data: {type: ProductType.Card, isPublic: true, approved: true}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.productsService.add(item))
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

    editItem(bank: Bank) {
        const dialogRef = this.dialog.open(EditProductDialogComponent, {
            data: {...bank}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.productsService.update(item.id, item))
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

    deleteItem(item: Bank) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {caption: 'Вы уверены что хотите отвязать банк?', text: item.title}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(() => this.productsService._delete(item.id))
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
        this.router.navigate(['admin/products', row.id]);
    }
}
