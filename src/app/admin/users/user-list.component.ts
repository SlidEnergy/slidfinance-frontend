import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {User} from '../../api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<User>();

  @Input() set users(value: User[]) {
    if (value && value.length > 0) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  columnsToDisplay = ['email'];
  loadingVisible = true;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.filterPredicate = this.filterPredicate.bind(this);
    this.dataSource.paginator = this.paginator;
  }

  filterPredicate(user: User, filter) {
    if (!filter) {
      return true;
    }

    if (!filter || user.email.toLowerCase().indexOf(filter) >= 0) {
      return true;
    }

    return false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
