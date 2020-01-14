import {Component, Input, OnInit} from '@angular/core';
import {CashbackCategory, CashbackCategoryMccService} from '../../../../../api';

@Component({
  selector: 'app-cashback-category',
  templateUrl: './cashback-category.component.html',
  styleUrls: ['./cashback-category.component.scss']
})
export class CashbackCategoryComponent implements OnInit {
  @Input() category: CashbackCategory;
  newMccCode: string = '';
  addingMode: boolean = false;

  constructor(private cashbackMcc: CashbackCategoryMccService) { }

  ngOnInit() {
  }

  addCashbackMcc() {
    this.newMccCode = '';
    this.addingMode = false;
  }
}
