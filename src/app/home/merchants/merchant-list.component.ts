import {Component, Input, OnInit} from '@angular/core';
import {Mcc, Merchant} from '../../api';
import {EntityDataContextService} from '../../core/entity/entity-data-context.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchants: Merchant[];

  mcc: Mcc[];

  constructor(private dataContext: EntityDataContextService) {
  }

  ngOnInit() {
    this.dataContext.mcc.getListLazy().subscribe(x => this.mcc = x);
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
