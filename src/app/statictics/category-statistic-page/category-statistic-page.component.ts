import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { CategoryStatistic, StatisticsService } from 'src/app/api';

@Component({
  selector: 'app-category-statistic-page',
  templateUrl: './category-statistic-page.component.html',
  styleUrls: ['./category-statistic-page.component.scss']
})
export class CategoryStatisticPageComponent implements OnInit {
  categoryStatistic: Observable<CategoryStatistic[]>;
  startDate = moment.utc().add(-2, 'month').startOf('month');
  endDate = moment.utc().endOf('month');

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.update();
  }

  prevMonth() {
    this.startDate.add(-1, 'month');
    this.endDate.add(-1, 'month');
    this.update();
  }

  nextMonth() {
    this.startDate.add(1, 'month');
    this.endDate.add(1, 'month');
    this.update();
  }

  update() {
    this.categoryStatistic = this.statisticsService.getCategoryStatistic(this.startDate.toDate(), this.endDate.toDate());
  }
}
