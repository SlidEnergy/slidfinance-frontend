import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

import { Transaction, CategoriesService, Category, MonthStatistic } from 'src/app/api';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-category-statistic',
  templateUrl: './category-statistic.component.html',
  styleUrls: ['./category-statistic.component.scss']
})
export class CategoryStatisticComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  
  categoryStatistic: MonthStatistic[];
  categories: Map<string, Category>;
  
  dataSource = new MatTableDataSource<Transaction>();

  @Input('categoryStatistic') set categoryStatisticInput(value: MonthStatistic[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = [ 'category', 'amount'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.categoriesService.getCategory().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category': {
          if (!item.categoryId || !this.categories)
            return "";

          return this.categories.get(item.categoryId) || "";
        }

        default: return item[property];
      }
    };
  }

  getCategoryTitle(categoryId: string) {
    if(!categoryId)
      return "Без категории";

    return this.categories && this.categories.get(categoryId).title;
  }
}
