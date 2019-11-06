import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../api';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users = this.usersService.getList();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

}
