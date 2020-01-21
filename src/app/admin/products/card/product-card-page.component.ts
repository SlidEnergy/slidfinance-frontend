import {Component, OnInit} from '@angular/core';
import {ProductTariff, TariffsService} from 'src/app/api';
import {Observable} from 'rxjs';
import {map, filter, share, switchMap, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-card-page',
  templateUrl: './product-card-page.component.html',
  styleUrls: ['./product-card-page.component.scss']
})
export class ProductCardPageComponent implements OnInit {
  tariffs: Observable<ProductTariff[]>;

  cardEntityId = this.route.params.pipe(
    map(params => +params['id']),
    filter(x => Boolean(x)),
    shareReplay()
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tariffsService: TariffsService,
  ) {
  }

  ngOnInit() {
    this.tariffs = this.cardEntityId.pipe(
      switchMap(id => this.tariffsService.getList(id))
    );
  }
}
