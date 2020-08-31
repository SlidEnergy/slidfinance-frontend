import {Component, OnInit} from '@angular/core';
import {CashbackCategoriesService, CashbackCategory, ProductTariff, TariffsService} from 'src/app/api';
import {Observable} from 'rxjs';
import {map, filter, share, switchMap, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tariff-card-page',
  templateUrl: './tariff-card-page2.component.html',
  styleUrls: ['./tariff-card-page2.component.scss']
})
export class TariffCardPage2Component implements OnInit {
  categories: Observable<CashbackCategory[]>;

  cardEntityId = this.route.params.pipe(
    map(params => +params['id']),
    filter(x => Boolean(x)),
    shareReplay()
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cashbackCategoriesService: CashbackCategoriesService,
  ) {
  }

  ngOnInit() {
    this.categories = this.cardEntityId.pipe(
      switchMap(id => this.cashbackCategoriesService.getList(id))
    );
  }
}
