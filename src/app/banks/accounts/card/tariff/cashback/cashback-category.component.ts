import {Component, Input, OnInit} from '@angular/core';
import {CashbackCategory, CashbackCategoryMccService, Mcc} from '../../../../../api';
import { MatSnackBar } from '@angular/material/snack-bar';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EntityDataContextService} from '../../../../../core/entity/entity-data-context.service';

@Component({
  selector: 'app-cashback-category',
  templateUrl: './cashback-category.component.html',
  styleUrls: ['./cashback-category.component.scss']
})
export class CashbackCategoryComponent implements OnInit {
  @Input() category: CashbackCategory;
  mcc: Mcc[];
  cashbackMccCodes: Observable<string>;

  constructor(private cashbackMcc: CashbackCategoryMccService,
              private dataContext: EntityDataContextService,
  ) {
  }

  ngOnInit() {
    this.dataContext.mcc.getListLazy().subscribe(
      value => this.mcc = value
    );

    this.cashbackMccCodes = this.cashbackMcc.getList(this.category.id).pipe(
      map(cashbackMcc => cashbackMcc.map(item => item.mccCode.toString().padStart(4, '0')).join(', '))
    );
  }
}
