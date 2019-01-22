import { Component, OnInit, Input } from '@angular/core';

import { Transaction, CategoriesService, Category, MonthStatistic} from 'src/app/api';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-category-statistic',
  templateUrl: './category-statistic.component.html',
  styleUrls: ['./category-statistic.component.scss']
})
export class CategoryStatisticComponent implements OnInit {
  categoryStatistic: MonthStatistic[];
  categories: Category[];

  @Input('categoryStatistic') set categoryStatisticInput(value: MonthStatistic[]) {
    if (value) {
      this.loadingVisible = false;
      this.categoryStatistic = value;
    }
  }

  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.categoriesService.getCategory().subscribe(data => this.categories = data);
  }

  getCategoryTitle(accountId: number) {
    return this.categories.get(accountId).title;
  }
}
