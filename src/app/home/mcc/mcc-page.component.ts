import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Mcc} from '../../api';
import {EntityDataContextService} from '../../core/entity/entity-data-context.service';

@Component({
  selector: 'app-mcc-page',
  templateUrl: './mcc-page.component.html',
  styleUrls: ['./mcc-page.component.scss']
})
export class MccPageComponent implements OnInit {

  mcc: Observable<Mcc[]> = this.dataContext.mcc.getListLazy();

  constructor(private dataContext: EntityDataContextService) {
    console.log("Mcc page component")
  }

  ngOnInit() {
  }

}
