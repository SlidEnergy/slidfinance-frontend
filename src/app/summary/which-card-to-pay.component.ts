import { Component, OnInit } from '@angular/core';
import {AnalysisService, WhichCardToPay} from '../api';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-which-card-to-pay',
  templateUrl: './which-card-to-pay.component.html',
  styleUrls: ['./which-card-to-pay.component.scss']
})
export class WhichCardToPayComponent implements OnInit {
  search: string = '';
  cards: Observable<WhichCardToPay[]>;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
  }

  button_click() {
    this.cards = this.analysisService.whichCardToPay(this.search)
  }
}
