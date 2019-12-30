import {Component, Input, OnInit} from '@angular/core';
import {Merchant} from '../../api';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchants: Merchant[];

  constructor() { }

  ngOnInit() {
  }

}
