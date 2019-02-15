import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { Transaction, CategoriesService, Category, CategoryStatistic } from 'src/app/api';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-category-statistic',
  templateUrl: './category-statistic.component.html',
  styleUrls: ['./category-statistic.component.scss']
})
export class CategoryStatisticComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  categoryStatistic: CategoryStatistic[];
  categories: Map<number, Category>;

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

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category]))))
      .subscribe(data => {
        this.categories = data;
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
        this.dataSource.sort = this.sort;
      });
  }

  sortingDataAccessor(item, property) {
    switch (property) {
      case 'category': {
        if (!item.categoryId || !this.categories)
          return '';

        let category = this.categories.get(item.categoryId);
        return category ? category.title : '';
      }
      case 'order': {
        if (!item.categoryId || !this.categories)
          return 0;

        let category = this.categories.get(item.categoryId);
        return category ? category.order : 0;
      }

      default: return item[property];
    }
  }

  getCategoryTitle(categoryId: number) {
    if (!categoryId)
      return "Без категории";

    return this.categories && this.categories.get(categoryId).title;
  }

  getAmount(row: CategoryStatistic, date: moment.Moment) {
    if (!row || !date)
      return '';

    for (let item of row.months) {
      if (date.isSame(item.month, 'day'))
        return item.amount;
    }

    return '';
  }
}
