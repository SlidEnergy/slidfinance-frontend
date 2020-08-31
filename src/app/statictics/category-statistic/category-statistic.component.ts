import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';

import {map, filter} from 'rxjs/operators';
import * as moment from 'moment';

import {Transaction, CategoriesService, Category, CategoryStatistic, TransactionsService} from 'src/app/api';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/core/store/app-state';
import {TransactionListDialogComponent} from './transaction-list-dialog.component';
import {EntityDataContextService} from '../../core/entity/entity-data-context.service';
import {Dictionary} from '@ngrx/entity';

@Component({
    selector: 'app-category-statistic',
    templateUrl: './category-statistic.component.html',
    styleUrls: ['./category-statistic.component.scss']
})
export class CategoryStatisticComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @Output() prevMonth = new EventEmitter();
    @Output() nextMonth = new EventEmitter();

    categoryStatistic: CategoryStatistic[];
    categories: Dictionary<Category>;

    dataSource = new MatTableDataSource<Transaction>();

    @Input('categoryStatistic') set categoryStatisticInput(value: CategoryStatistic[]) {
        if (value) {
            this.loadingVisible = false;
            this.dataSource.data = value;
        }
    }

    @Input() startDate: moment.Moment;

    // Список колонок, которые нужно показать в таблице
    columnsToDisplay = ['category', 'month2', 'month1', 'month0'];
    loadingVisible = true;

    constructor(
        private categoriesService: CategoriesService,
        private store: Store<AppState>,
        private dialog: MatDialog,
        private transactionsService: TransactionsService,
        private dataContext: EntityDataContextService
    ) {
    }

    ngOnInit() {
        this.dataContext.categories.getMapLazy()
            .subscribe(data => {
                this.categories = data;
                this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
                this.dataSource.sort = this.sort;
            });
    }

    sortingDataAccessor(item, property) {
        switch (property) {
            case 'category': {
                if (!item.categoryId || !this.categories) {
                    return '';
                }

                let category = this.categories[item.categoryId];
                return category ? category.title : '';
            }
            case 'order': {
                if (!item.categoryId || !this.categories) {
                    return 0;
                }

                let category = this.categories[item.categoryId];
                return category ? category.order : 0;
            }

            default:
                return item[property];
        }
    }

    getCategoryTitle(categoryId: number) {
        if(categoryId && this.categories)
            return this.categories[categoryId].title;
    }

    getAmount(row: CategoryStatistic, date: moment.Moment) {
        if (!row || !date) {
            return '';
        }

        for (let item of row.months) {
            if (date.isSame(item.month, 'day')) {
                return item.amount;
            }
        }

        return '';
    }

    cell_Click(row: any, date: moment.Moment) {
        this.openTransactionsDialog(row.categoryId, date.toDate(), date.clone().endOf('month').toDate());
    }

    async openTransactionsDialog(categoryId: number, startDate: Date, endDate: Date) {
        var transactions = await this.transactionsService.getList(undefined, categoryId, startDate, endDate).toPromise();

        const dialogRef = this.dialog.open(TransactionListDialogComponent, {
            data: transactions
        });
    }
}
