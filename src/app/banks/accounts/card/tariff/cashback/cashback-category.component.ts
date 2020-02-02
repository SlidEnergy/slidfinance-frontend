import {Component, Input, OnInit} from '@angular/core';
import {CashbackCategory, CashbackCategoryMccService, Mcc} from '../../../../../api';
import {MatSnackBar} from '@angular/material';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppEntityServicesService} from '../../../../../core/store/entity/app-entity-services.service';

@Component({
  selector: 'app-cashback-category',
  templateUrl: './cashback-category.component.html',
  styleUrls: ['./cashback-category.component.scss']
})
export class CashbackCategoryComponent implements OnInit {
  @Input() category: CashbackCategory;
  newMccCodes: string = '';
  addingMode: boolean = false;
  mcc: Mcc[];
  cashbackMccCodes: Observable<string>;

  constructor(private cashbackMcc: CashbackCategoryMccService,
              private dataContext: AppEntityServicesService,
              private snackBar: MatSnackBar
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

  addCashbackMcc() {
    if (!this.mcc) {
      return;
    }

    const mccCodes = this.newMccCodes.split(', ');

    combineLatest(mccCodes.map(code => this.cashbackMcc.add(this.category.id.toString(), { categoryId: this.category.id, mccCode: +code})))
      .subscribe(
        value => {
          this.snackBar.open('МСС добавлены', undefined, {duration: 5000, panelClass: ['background-green']});
          this.newMccCodes = '';
          this.addingMode = false;
        },
            error => this.snackBar.open('Не удалось добавить МСС', undefined, {duration: 5000, panelClass: ['background-red']})
        );
  }
}
