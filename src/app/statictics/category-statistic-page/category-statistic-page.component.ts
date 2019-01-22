import { Component, OnInit } from '@angular/core';
import { MonthStatistic, StatisticsService } from 'src/app/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-statistic-page',
  templateUrl: './category-statistic-page.component.html',
  styleUrls: ['./category-statistic-page.component.scss']
})
export class CategoryStatisticPageComponent implements OnInit {
  categoryStatistic: Observable<MonthStatistic[]>;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.categoryStatistic = this.statisticsService.getCategoryStatistic(2019, 1);
  }
}
