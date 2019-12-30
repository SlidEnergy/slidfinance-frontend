import {Component, Input, OnInit} from '@angular/core';
import {MerchantsService} from '../../api';

@Component({
  selector: 'app-merchants-page',
  templateUrl: './merchants-page.component.html',
  styleUrls: ['./merchants-page.component.scss']
})
export class MerchantsPageComponent implements OnInit {
  merchants = this.merchantsService.getList();

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit() {
  }

}
