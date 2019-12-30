import {Component, Input, OnInit} from '@angular/core';
import {Merchant} from '../../api';
import {MccService} from '../../core/mcc/mcc.service';
import {Mcc} from '../../core/mcc/mcc';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchants: Merchant[];

  mcc: Mcc[];

  constructor(private mccService: MccService) {
  }

  ngOnInit() {
    this.mccService.getList().subscribe(x => this.mcc = x);
  }

  getMccCodeById(id: number) {
    if (!this.mcc) {
      return;
    }

    let mcc = this.mcc.find(x => x.id == id);
    if (!mcc) {
      return;
    }

    return mcc.code;
  }
}
