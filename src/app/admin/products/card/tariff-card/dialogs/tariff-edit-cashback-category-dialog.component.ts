import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Bank, CashbackCategory} from 'src/app/api';

@Component({
  selector: 'app-tariff-edit-cashback-category-dialog',
  templateUrl: './tariff-edit-cashback-category-dialog.component.html',
  styleUrls: ['./tariff-edit-cashback-category-dialog.component.scss']
})
export class TariffEditCashbackCategoryDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CashbackCategory) { }

  ngOnInit() {
  }

}
