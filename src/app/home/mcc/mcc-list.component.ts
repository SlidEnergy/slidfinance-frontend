import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Mcc, Transaction} from '../../api';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-mcc-list',
  templateUrl: './mcc-list.component.html',
  styleUrls: ['./mcc-list.component.scss']
})
export class MccListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Transaction>();
  @Input() set mcc(value: Mcc[]){
    if(value && value.length > 0) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }
  columnsToDisplay = ['code', 'ruTitle', 'category'];
  loadingVisible = true;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
