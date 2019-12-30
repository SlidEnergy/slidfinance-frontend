import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Mcc} from '../../api';
import {MccService} from '../../core/mcc/mcc.service';

@Component({
  selector: 'app-mcc-page',
  templateUrl: './mcc-page.component.html',
  styleUrls: ['./mcc-page.component.scss']
})
export class MccPageComponent implements OnInit {

  mcc: Observable<Mcc[]> = this.mccService.getList();

  constructor(private mccService: MccService) {
    console.log("Mcc page component")
  }

  ngOnInit() {
  }

}
