import { Component, OnInit } from '@angular/core';
import { BanksService, Bank } from 'src/app/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banks-page',
  templateUrl: './banks-page.component.html',
  styleUrls: ['./banks-page.component.scss']
})
export class BanksPageComponent implements OnInit {
  banks: Observable<Bank[]>;

  constructor(private banksService: BanksService) { }

  ngOnInit() {
    this.banks = this.banksService.getBanks();
  }

}
